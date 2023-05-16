<script lang="ts">
  const useDebugAudio = false;
  const bitsPerSample = 24;
  const bufferSize = 8192;
  const compression = 5;
  let autoGainControl = true;
  let echoCancellation = true;
  let noiseSuppression = true;
  let ready = false;
  let recording = false;
  let context = new AudioContext();
  let recorder: AudioWorkletNode;
  let stream: MediaStream;
  let audioSrc: string | undefined;

  const encoder = new Worker(import.meta.env.BASE_URL + "workers/encoder.js");
  encoder.addEventListener("message", (e) => {
    if (e.data.type === "done") {
      console.log("Encoding complete");
      audioSrc = URL.createObjectURL(e.data.blob);
    }
  });

  async function load() {
    await context.audioWorklet.addModule(import.meta.env.BASE_URL + "workers/recorder.worklet.js");
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
      stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          autoGainControl,
          echoCancellation,
          noiseSuppression,
        },
        video: false,
      });
      source = context.createMediaStreamSource(stream);
    }
    source.connect(recorder);

    ready = true;
  }
  load();

  $: if (ready && !useDebugAudio) {
    console.log("Reconfiguring audio:", {
      autoGainControl,
      echoCancellation,
      noiseSuppression,
    })
    const track = stream.getAudioTracks()[0]
    track.applyConstraints({
      autoGainControl,
      echoCancellation,
      noiseSuppression,
    });
  }

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
      Compression level: {compression}<br>
      <label>
        <input type="checkbox" bind:checked={autoGainControl}>
        Auto gain control
      </label>
      <br>
      <label>
        <input type="checkbox" bind:checked={echoCancellation}>
        Echo cancellation
      </label>
      <br>
      <label>
        <input type="checkbox" bind:checked={noiseSuppression}>
        Noise suppression
      </label>
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
