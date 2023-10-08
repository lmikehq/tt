import { useState, useEffect } from "react";

interface TextToSpeechFunctions {
  play: () => void;
  pause: () => void;
  stop: () => void;
  isPlaying: boolean;
}

const useTextToSpeech = (text: string): TextToSpeechFunctions => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(
    null
  );

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const play = (): void => {
    const synth = window.speechSynthesis;
    if (utterance) {
      if (isPaused) {
        synth.resume();
      } else {
        synth.speak(utterance);
        setIsPlaying(true);
      }
      setIsPaused(false);
    }
  };

  const pause = (): void => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stop = (): void => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
    setIsPlaying(false);
  };

  return { play, pause, stop, isPlaying };
};

export default useTextToSpeech;
