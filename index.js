const express = require('express');
const path = require('path');

const app = express();

const port = 3001;

app.get('*', (req, res) => {
  const wasmFile = path.resolve(__dirname, 'wasm-audio/pkg/wasm_audio_bg.wasm');
  console.log(wasmFile);
  res.sendFile(wasmFile);
});

app.listen(port, () => `listening on ${port}!`);
