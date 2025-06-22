import { useState, useRef, useEffect } from "react";
import {
  uploadToS3,
  transcribeAudio,
  initializeAWS,
} from "../../services/awsServices";

export const useAudioRecording = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  const mimeType = "audio/webm"; // common supported mimeType

  useEffect(() => {
    try {
      initializeAWS();
    } catch (err) {
      console.error("Failed to initialize AWS:", err);
      setError(err.message);
    }
  }, []);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log("Chunk received:", event.data.size, "bytes");
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log(
          "Recording stopped. Final blob size:",
          audioBlob.size,
          "bytes"
        );

        // Stop all audio tracks to release mic
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }

        if (audioBlob.size > 0) {
          await handleTranscription(audioBlob);
        } else {
          setError(
            "No audio data recorded. Please try speaking louder or check your microphone."
          );
        }
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        setError("Recording error occurred");
        setIsListening(false);
      };

      mediaRecorder.start();
      setIsListening(true);
      console.log("Recording started");
    } catch (err) {
      console.error("Error accessing microphone:", err);
      let errorMessage = "Could not start recording";
      if (err.name === "NotAllowedError") {
        errorMessage =
          "Microphone access denied. Please allow microphone permissions.";
      } else if (err.name === "NotFoundError") {
        errorMessage = "No microphone found. Please connect a microphone.";
      }
      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      console.log("Recording stopped");
    }
  };

  const handleTranscription = async (audioBlob) => {
    try {
      setIsProcessing(true);
      setError(null);

      console.log("Starting transcription process...", {
        blobSize: audioBlob.size,
        blobType: audioBlob.type,
      });

      if (audioBlob.size < 1000) {
        console.warn(
          "Audio blob is very small; this might indicate a recording issue."
        );
      }

      console.log("Uploading to S3...");
      const s3Uri = await uploadToS3(audioBlob);
      console.log("Upload successful, starting transcription...");

      const transcriptionText = await transcribeAudio(s3Uri);
      console.log("Transcription completed:", transcriptionText);

      if (!transcriptionText || transcriptionText.trim().length === 0) {
        throw new Error(
          "No speech was detected in the audio. Please try speaking more clearly."
        );
      }

      setTranscript(transcriptionText);
    } catch (error) {
      console.error("Transcription error:", error);
      setError(`Transcription failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const clearTranscript = () => {
    setTranscript("");
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  // Cleanup media and stream on unmount
  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    isListening,
    isProcessing,
    transcript,
    setTranscript,
    error,
    startRecording,
    stopRecording,
    clearTranscript,
    clearError,
  };
};
