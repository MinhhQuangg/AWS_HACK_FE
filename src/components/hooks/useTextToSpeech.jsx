import { useState, useRef } from "react";
import { synthesizeSpeech } from "../../services/awsServices";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioElementRef = useRef(null);

  const speakText = async (input) => {
    if (!input.trim()) return;

    let audioUrl = "";

    try {
      setIsSpeaking(true);

      if (input.startsWith("http")) {
        audioUrl = input; // it's an audio URL from S3
      } else {
        audioUrl = await synthesizeSpeech(input); // fallback to Polly
      }

      if (audioElementRef.current) {
        audioElementRef.current.src = audioUrl;
        audioElementRef.current.onended = () => {
          setIsSpeaking(false);
          if (!audioUrl.startsWith("http")) {
            URL.revokeObjectURL(audioUrl); // only for blob URLs
          }
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
