const bufferSize = 8192;
const bitsPerSample = 24;
const scaleFactor = Math.pow(2, bitsPerSample) / 2;

class RecorderProcessor
  extends AudioWorkletProcessor
  implements AudioWorkletProcessorImpl
{
  dataPort?: MessagePort;
  buffer = new Int32Array(bufferSize);
  offset = 0;

  constructor() {
    super();
    this.port.onmessage = (e) => {
      console.log(e.data);
      switch (e.data.eventType) {
        case "dataPort":
          this.dataPort = e.ports[0];
          break;
        case "stop":
          this.dataPort?.postMessage({
            eventType: "end",
            buffer: this.buffer.slice(0, this.offset),
          });
          this.dataPort = undefined;
          this.port.postMessage({ eventType: "done" });
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

    let channel = inputs[0][0];
    let i = 0;
    while (i < channel.length) {
      for (; i < channel.length && this.offset + i < this.buffer.length; i++) {
        this.buffer[this.offset + i] =
          channel[i] * (scaleFactor - (channel[i] < 0 ? 0 : 1));
      }
      if (this.offset + i >= this.buffer.length) {
        this.flush();
        this.offset -= this.buffer.length;
      }
    }
    this.offset += i;
    return true;
  }

  flush() {
    this.dataPort?.postMessage({
      eventType: "data",
      buffer: this.buffer,
    });
  }
}

registerProcessor("recorder", RecorderProcessor);

export {};
