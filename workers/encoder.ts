import * as Flac from "libflacjs/dist/libflac.wasm";
import { Encoder } from "libflacjs/src/encoder";
import { exportFlacFile } from "libflacjs/src/utils";

const flacReady = new Promise((resolve, reject) => Flac.on("ready", resolve));

console.log("Worker loaded, waiting for recorder");

function assert(cond: any): asserts cond {
    if (!cond) {
        throw new Error("assertion failed");
    }
}

async function recorderChanged(dataPort: MessagePort, sampleRate: number) {
  console.log("Waiting on Flac");
  await flacReady;
  console.log("Flac ready");

  const encoder = new Encoder(Flac, {
    sampleRate, // number, e.g. 44100
    channels: 1, // number, e.g. 1 (mono), 2 (stereo), ...
    bitsPerSample: 24, // number, e.g. 8 or 16 or 24
    compression: 4, // number, value between [0, 8] from low to high compression
    verify: true, // boolean (OPTIONAL)
    isOgg: false, // boolean (OPTIONAL), if encoded FLAC should be wrapped in OGG container
  });

  dataPort.onmessage = (e) => {
    switch (e.data.eventType) {
      case "data":
        assert(encoder.encode([e.data.buffer]));
        break;
      case "end":
        if (e.data.buffer.length) {
            assert(encoder.encode([e.data.buffer]));
        }
        assert(encoder.encode());
        const samples = encoder.getSamples();
        const metadata = encoder.metadata;
        assert(metadata);
        encoder.destroy();
        const blob = exportFlacFile([samples], metadata, false);
        console.log({ metadata, blob });
        postMessage({ eventType: "done", blob })
        break;
    }
  };
}

addEventListener("message", (e) => {
  if (e.data.eventType === "recorderChanged") {
    recorderChanged(e.ports[0], e.data.sampleRate);
  }
});
