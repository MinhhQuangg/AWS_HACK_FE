import { useState, useRef } from "react";
import { synthesizeSpeech } from "../../services/awsServices";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioElementRef = useRef(null);

  const speakText = async (text) => {
    if (!text.trim()) return;

    try {
      setIsSpeaking(true);
      const audioUrl = await synthesizeSpeech(text);

      if (audioElementRef.current) {
        audioElementRef.current.src = audioUrl;
        audioElementRef.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        await audioElementRef.current.play();
      }
    } catch (error) {
      console.error("Text-to-speech error:", error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    setIsSpeaking(false);
  };

  return {
    isSpeaking,
    audioElementRef,
    speakText,
    stopSpeaking,
  };
};
