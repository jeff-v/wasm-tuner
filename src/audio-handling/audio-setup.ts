declare class AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: { [name: string]: Float32Array }
  ): boolean;
  registerProcessor(
    name: string,
    processorCtor: (new (
      options?: AudioWorkletNodeOptions
    ) => AudioWorkletProcessor) & {
      parameterDescriptors?: AudioParamDescriptor[];
    }
  ): void;
}

class AudioProcessor extends AudioWorkletProcessor {
  totalSamples: number;
  numberOfAudioSamplesPerAnalysis: number;
  samples: number[];
  pitch: number;
  detectPitch: (samples: number[]) => number;
  result: number;

  constructor(detectPitch: (samples: number[]) => number) {
    super()
    this.totalSamples = 0;
    this.numberOfAudioSamplesPerAnalysis = 0;
    this.samples = []
    this.pitch = 0;
    this.detectPitch = detectPitch;
    this.result = 0;
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: { [name: string]: Float32Array }
  ) {
    const inputSamples = inputs[0][0]
    if (this.totalSamples < this.numberOfAudioSamplesPerAnalysis) {
      for (const sampleValue of inputSamples) {
        this.samples[this.totalSamples++] = sampleValue;
      }
    } else {
       const numNewSamples = inputSamples.length;
      const numExistingSamples = this.samples.length - numNewSamples;
      for (let i = 0; i < numExistingSamples; i++) {
        this.samples[i] = this.samples[i + numNewSamples];
      }
       for (let i = 0; i < numNewSamples; i++) {
        this.samples[numExistingSamples + i] = inputSamples[i];
      }
      this.totalSamples += inputSamples.length;
       if (this.totalSamples >= this.numberOfAudioSamplesPerAnalysis) {
      this.result = this.detectPitch(this.samples);

    }

    return true;

  }
}

const audioSetup = (audioContext: AudioContext) =>
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      // const buffer = audioContext.createBuffer(2, 128, 44100)
      const thing = audioContext.audioWorklet.console.log(thing);
      return audioContext.createMediaStreamSource(stream);
    })
    .catch((err) => {
      throw new Error(err);
    });

export default audioSetup;
