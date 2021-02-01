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
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: { [name: string]: Float32Array }
  ) {
    const inputChannels = inputs[0];
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
