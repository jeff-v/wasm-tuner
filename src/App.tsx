import React, { useState, useEffect, useCallback } from 'react';
// import AudioRecorderControl from './components/audio-recorder-control/audio-recorder-control';
import audioSetup from './audio-handling/audio-setup';
import './App.css';

const audioContext = new AudioContext();

type PitchDetector = typeof import('wasm-audio');

export default function App() {
  const [pitchDetector, setPitchDetector] = useState<PitchDetector>();
  const [audioSource, setAudioSource] = useState<MediaStreamAudioSourceNode>();
  const [sampleRate, setSampleRate] = useState<number>();

  useEffect(() => {
    if (pitchDetector) {
      audioSetup(audioContext).then((res) => {
        // pitchDetector.get_pitch(res.to)
        setAudioSource(res);
        // setSampleRate(res.context.sampleRate);
        res.connect(audioContext.destination);
      });
    }
  }, []);

  const loadWasm = useCallback(async () => {
    const wasmAudio = await import('wasm-audio');
    setPitchDetector(wasmAudio);
  }, []);

  useEffect(() => {
    loadWasm();
  }, [loadWasm]);

  // useEffect(() => {
  //   if (pitchDetector) {
  //     console.log(pitchDetector);
  //   }
  // }, [pitchDetector]);

  // useEffect(() => {
  //   if (audioSource && pitchDetector) {
  //     pitchDetector(audioSource.)
  //   }
  // }, [])

  return (
    <div className='App'>
      <header className='App-header'>Wasm Audio Tutorial</header>
      <div className='App-content'>{/* <AudioRecorderControl /> */}</div>
    </div>
  );
}
