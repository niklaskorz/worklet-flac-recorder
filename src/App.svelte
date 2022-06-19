<script lang="ts">
  const useDebugAudio = false;
  const bitsPerSample = 24;
  const bufferSize = 8192;
  const compression = 5;
  let ready = false;
  let recording = false;
  let context = new AudioContext();
  let recorder: AudioWorkletNode;
  let audioSrc: string | undefined;

  const encoder = new Worker("/workers/encoder.js");
  encoder.addEventListener("message", (e) => {
    if (e.data.type === "done") {
      console.log("Encoding complete");
      audioSrc = URL.createObjectURL(e.data.blob);
    }
  });

  async function load() {
    await context.audioWorklet.addModule(
      new URL("./lib/recorder.worklet.ts", import.meta.url)
    );
    recorder = new AudioWorkletNode(context, "recorder");
    recorder.port.onmessage = (e) => {
      if (e.data.type === "done") {
        recording = false;
        console.log("Recorder stopped");
      }
    };
    recorder.connect(context.destination);

    let source: AudioNode;
    if (useDebugAudio) {
      const audio = new Audio("/audio.m4a");
      audio.loop = true;
      audio.play();
      source = context.createMediaElementSource(audio);
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      source = context.createMediaStreamSource(stream);
    }
    source.connect(recorder);

    ready = true;
  }
  load();

  async function start() {
    const dataChannel = new MessageChannel();
    recorder.port.postMessage(
      { type: "start", bufferSize, bitsPerSample },
      [dataChannel.port1]
    );
    encoder.postMessage(
      {
        type: "start",
        sampleRate: context.sampleRate,
        bitsPerSample,
        compression,
      },
      [dataChannel.port2]
    );
    recording = true;
  }

  function stop() {
    recorder?.port.postMessage({ type: "stop" });
  }
</script>

<main>
  {#if ready}
    <h1>Flac Recorder</h1>
    <p>
      Sample rate: {context.sampleRate}<br>
      Bits per sample: {bitsPerSample}<br>
      Buffer size: {bufferSize}<br>
      Compression level: {compression}
    </p>
    <p>
      {#if recording}
        <button on:click={stop}>Stop</button>
      {:else}
        <button on:click={start}>Start</button>
      {/if}
    </p>
  {:else}
    <p>Loading...</p>
  {/if}
  {#if audioSrc}
    <h2>Result</h2>
    <p><audio src={audioSrc} controls /></p>
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
