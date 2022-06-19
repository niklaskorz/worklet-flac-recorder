import * as Flac from "libflacjs/dist/libflac.wasm";
import { Encoder } from "libflacjs/src/encoder";
import { exportFlacFile } from "libflacjs/src/utils";

const flacReady = new Promise((resolve, reject) => Flac.on("ready", resolve));

console.log("Worker loaded, waiting for recording to start");

function assert(cond: any): asserts cond {
  if (!cond) {
    throw new Error("assertion failed");
  }
}

interface StartMessage {
  type: "start";
  sampleRate: number;
  bitsPerSample: number;
  channels: number;
  compression: Flac.CompressionLevel;
}

async function start(
  { sampleRate, bitsPerSample, channels, compression }: StartMessage,
  dataPort: MessagePort
) {
  console.log("Waiting on Flac");
  await flacReady;
  console.log("Encoder running");

  let encoder: Encoder | undefined;
  dataPort.onmessage = (e) => {
    const msg = e.data;
    switch (msg.type) {
      case "data":
        if (!encoder) {
          encoder = new Encoder(Flac, {
            sampleRate, // number, e.g. 44100
            channels: msg.data.length, // number, e.g. 1 (mono), 2 (stereo), ...
            bitsPerSample, // number, e.g. 8 or 16 or 24
            compression, // number, value between [0, 8] from low to high compression
            verify: true, // boolean (OPTIONAL)
            isOgg: false, // boolean (OPTIONAL), if encoded FLAC should be wrapped in OGG container
          });
        }
        assert(encoder.encode(msg.data));
        break;
      case "end":
        assert(encoder);
        if (msg.data[0].length) {
          assert(encoder.encode(msg.data));
        }
        assert(encoder.encode());
        const samples = encoder.getSamples();
        const metadata = encoder.metadata;
        assert(metadata);
        encoder.destroy();
        const blob = exportFlacFile([samples], metadata, false);
        postMessage({ type: "done", blob });
        break;
    }
  };
}

addEventListener("message", (e) => {
  if (e.data.type === "start") {
    start(e.data, e.ports[0]);
  }
});
