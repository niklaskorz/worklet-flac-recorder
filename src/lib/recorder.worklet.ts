function assert(cond: any): asserts cond {
  if (!cond) {
    throw new Error("assertion failed");
  }
}

class RecorderProcessor
  extends AudioWorkletProcessor
  implements AudioWorkletProcessorImpl
{
  dataPort?: MessagePort;
  data?: Int32Array[];
  bufferSize = 0;
  offset = 0;
  scaleFactor = 1;

  constructor() {
    super();
    this.port.onmessage = (e) => {
      const msg = e.data;
      switch (msg.type) {
        case "start":
          console.log("Starting to record");
          this.dataPort = e.ports[0];
          this.bufferSize = msg.bufferSize;
          this.offset = 0;
          this.scaleFactor = Math.pow(2, msg.bitsPerSample) / 2;
          break;
        case "stop":
          console.log("Stopping to record");
          assert(this.dataPort);
          assert(this.data);
          this.dataPort.postMessage(
            {
              type: "end",
              data: this.data.map((array) => array.slice(0, this.offset)),
            },
            this.data.map((array) => array.buffer)
          );
          this.dataPort = undefined;
          this.data = undefined;
          this.port.postMessage({ type: "done" });
          break;
      }
    };
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean {
    if (!this.dataPort) {
      return true;
    }

    let input = inputs[0];
    let channels = input.length;
    let samples = input[0].length;

    if (!this.data) {
      this.data = Array.from(
        { length: channels },
        () => new Int32Array(this.bufferSize)
      );
    }

    let i = 0;
    while (i < samples) {
      for (; i < samples && this.offset + i < this.bufferSize; i++) {
        for (let channel = 0; channel < channels; channel++) {
          this.data[channel][this.offset + i] =
            input[channel][i] *
            (this.scaleFactor - (input[channel][i] < 0 ? 0 : 1));
        }
      }
      if (this.offset + i >= this.bufferSize) {
        this.dataPort.postMessage({
          type: "data",
          data: this.data,
        });
        this.offset -= this.bufferSize;
      }
    }
    this.offset += i;
    return true;
  }
}

registerProcessor("recorder", RecorderProcessor);

export {};
