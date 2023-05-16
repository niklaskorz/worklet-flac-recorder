(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // workers/recorder.worklet.ts
  function assert(cond) {
    if (!cond) {
      throw new Error("assertion failed");
    }
  }
  var RecorderProcessor = class extends AudioWorkletProcessor {
    constructor() {
      super();
      __publicField(this, "dataPort");
      __publicField(this, "data");
      __publicField(this, "bufferSize", 0);
      __publicField(this, "offset", 0);
      __publicField(this, "scaleFactor", 1);
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
            this.dataPort.postMessage({
              type: "end",
              data: this.data.map((array) => array.slice(0, this.offset))
            }, this.data.map((array) => array.buffer));
            this.dataPort = void 0;
            this.data = void 0;
            this.port.postMessage({ type: "done" });
            break;
        }
      };
    }
    process(inputs, outputs, parameters) {
      if (!this.dataPort) {
        return true;
      }
      let input = inputs[0];
      let channels = input.length;
      let samples = input[0].length;
      if (!this.data) {
        this.data = Array.from({ length: channels }, () => new Int32Array(this.bufferSize));
      }
      let start = 0;
      while (start < samples) {
        const end = Math.min(samples, start + this.bufferSize - this.offset);
        for (let ch = 0; ch < channels; ch++) {
          for (let i = start; i < end; i++) {
            this.data[ch][this.offset + i] = input[ch][i] * (this.scaleFactor - (input[ch][i] < 0 ? 0 : 1));
          }
        }
        this.offset += end - start;
        if (this.offset >= this.bufferSize) {
          this.dataPort.postMessage({
            type: "data",
            data: this.data
          });
          this.offset = 0;
        }
        start = end;
      }
      return true;
    }
  };
  registerProcessor("recorder", RecorderProcessor);
})();
