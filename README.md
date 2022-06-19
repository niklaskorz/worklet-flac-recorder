# Audio Worklet Flac Recorder

A demo / example for recording audio using a Web Audio worklet processor and a Flac-encoding web worker.
Data is directly passed from the worklet to the worker, only the final result is copied into the main thread.

## Setup

```
npm install
npm run build-workers
npm run dev
```
