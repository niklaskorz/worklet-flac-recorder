<script lang="ts">
  let context: AudioContext | undefined;
  let recorder: AudioWorkletNode | undefined;
  let audioSrc: string | undefined;
  const encoder = new Worker("/workers/encoder.js");

  encoder.addEventListener("message", (e) => {
    console.log(e.data);
    if (e.data.eventType === "done") {
      audioSrc = URL.createObjectURL(e.data.blob);
    }
  });

  async function start() {
    context = new AudioContext();

    /*const audio = new Audio("/audio.m4a");
    audio.loop = true;
    audio.play();
    const source = context.createMediaElementSource(audio);*/

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = context.createMediaStreamSource(stream);

    await context.audioWorklet.addModule(
      new URL("./lib/recorder.worklet.ts", import.meta.url)
    );
    recorder = new AudioWorkletNode(context, "recorder");
    recorder.port.onmessage = (e) => {
      console.log(e.data);
      if (e.data.eventType === "done") {
        //audio.pause();
        context.close();
        console.log("recorder stopped");
        context = undefined;
        recorder = undefined;
      }
    };
    source.connect(recorder).connect(context.destination);
    const dataChannel = new MessageChannel();
    recorder.port.postMessage({ eventType: "dataPort" }, [dataChannel.port1]);
    encoder.postMessage(
      { eventType: "recorderChanged", sampleRate: context.sampleRate },
      [dataChannel.port2]
    );
  }

  function stop() {
    recorder?.port.postMessage({ eventType: "stop" });
  }
</script>

<main>
  <h1>Hello</h1>
  <button on:click={context ? stop : start}>{context ? "Stop" : "Start"}</button
  >
  {#if audioSrc}
    <audio src={audioSrc} controls />
  {/if}
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }
</style>
