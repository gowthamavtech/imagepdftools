'use strict';

// LibreOffice WASM SDK worker.
// browser.worker.global.js installs its own onmessage handler and fires
// {type:"loaded"} once ready. The main thread then drives the protocol:
//   1. {type:"loaded"}                          ← SDK ready
//   2. → {type:"init", sofficeJs/Wasm/Data/WorkerJs, id}
//   3. {type:"progress", id, progress:0-100}    ← download progress
//   4. {type:"ready", id}                       ← WASM initialised
//   5. → {type:"convert", id, inputData, inputExt, outputFormat}
//   6. {type:"progress", id, progress:0-100}    ← conversion progress
//   7. {type:"result", id, data:Uint8Array}      ← success
//      {type:"error",  id, error:string}         ← failure

// Local copy with WASM init timeout extended to 600 s (10 min).
// The CDN version has a 120 s timeout which isn't enough for the first
// download of 242 MB (soffice.wasm 147 MB + soffice.data 95 MB).
importScripts(`${self.location.origin}/lo-worker-sdk.js`);
