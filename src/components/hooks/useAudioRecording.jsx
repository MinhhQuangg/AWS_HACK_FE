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

  // const [mimeType, setMimeType] = useState("audio/webm");
  const [mimeType, setMimeType] = useState("audio/wav");

  // Initialize AWS on component mount
  useEffect(() => {
    try {
      initializeAWS();
    } catch (error) {
      console.error("Failed to initialize AWS:", error);
      setError(error.message);
    }
  }, []);

  const startRecording = async () => {
    try {
      setError(null);

      // Check for microphone support
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser doesn't support audio recording");
      }

      // Try basic audio first, then add constraints if it works
      let stream;
      try {
        // First try with minimal constraints
        stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        console.log("Basic audio constraints worked");
      } catch (error) {
        console.log("Basic audio failed, trying with constraints:", error);
        // If basic fails, try with specific constraints
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      }

      streamRef.current = stream;
      audioChunksRef.current = [];

      // Try simpler MediaRecorder first
      let mediaRecorder;
      try {
        // Try without any options first
        mediaRecorder = new MediaRecorder(stream);
        console.log(`Using default MediaRecorder settings`);
      } catch (error) {
        console.log(`Default MediaRecorder failed: ${error.message}`);

        // Fallback to specific MIME type
        const supportedTypes = [
          "audio/webm;codecs=opus",
          "audio/webm",
          "audio/mp4",
          "audio/ogg;codecs=opus",
          "audio/wav",
        ];

        for (const type of supportedTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            // setMimeType(type);
            // console.log(`Fallback using MIME type: ${mimeType}`);
            const selectedMimeType = type;
            console.log(`Fallback using MIME type: ${selectedMimeType}`);
            mediaRecorder = new MediaRecorder(stream, {
              mimeType: selectedMimeType,
            });
            break;
          }
        }

        mediaRecorder = new MediaRecorder(stream, { mimeType });
      }

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        console.log(`Data available: ${event.data.size} bytes`);
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        console.log(`Total chunks collected: ${audioChunksRef.current.length}`);
        console.log(
          `Chunk sizes:`,
          audioChunksRef.current.map((chunk) => chunk.size)
        );

        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        console.log(`Final blob size: ${audioBlob.size} bytes`);

        if (audioBlob.size > 0) {
          await handleTranscription(audioBlob);
        } else {
          setError(
            "No audio data was recorded. Please try speaking louder or check your microphone."
          );
        }
      };

      mediaRecorder.onstart = () => {
        console.log("MediaRecorder started");
      };

      mediaRecorder.onerror = (event) => {
        console.error("MediaRecorder error:", event.error);
        setError("Recording error occurred");
        setIsListening(false);
      };

      // Start recording - don't use timeslice for now to avoid issues
      console.log("Tracks:", stream.getAudioTracks());
      stream.getAudioTracks().forEach((track) => {
        console.log("Track enabled:", track.enabled);
      });

      mediaRecorder.start(1000);
      setIsListening(true);
      console.log("Recording started with MIME type:", mimeType);
    } catch (error) {
      console.error("Error starting recording:", error);
      let errorMessage = "Could not start recording";

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Microphone access denied. Please allow microphone permissions.";
      } else if (error.name === "NotFoundError") {
        errorMessage = "No microphone found. Please connect a microphone.";
      } else if (error.name === "NotSupportedError") {
        errorMessage = "Your browser doesn't support audio recording.";
      }

      setError(errorMessage);
    }
  };

  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        console.log("Stopping MediaRecorder...");
        mediaRecorderRef.current.stop();
      }

      // Don't stop the stream immediately - let the MediaRecorder finish processing
      setTimeout(() => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => {
            track.stop();
            console.log("Audio track stopped");
          });
        }
      }, 100);

      setIsListening(false);
    } catch (error) {
      console.error("Error stopping recording:", error);
      setError("Error stopping recording");
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

      if (audioBlob.size === 0) {
        throw new Error(
          "No audio data recorded. Please ensure you're speaking and your microphone is working."
        );
      }

      // Minimum size check (roughly 1 second of audio should be > 1KB)
      if (audioBlob.size < 1000) {
        console.warn(
          "Audio blob is very small, this might indicate a recording issue"
        );
      }

      // Upload to S3
      console.log("Uploading to S3...");
      const s3Uri = await uploadToS3(audioBlob);
      console.log("Upload successful, starting transcription...");

      // Transcribe audio
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

  const cleanup = () => {
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    } catch (error) {
      console.error("Cleanup error:", error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, []);

  return {
    isListening,
    isProcessing,
    transcript,
    error,
    startRecording,
    stopRecording,
    clearTranscript,
    clearError,
    cleanup,
  };
};




// import { useState, useRef, useEffect } from "react";
// import {
//   uploadToS3,
//   transcribeAudio,
//   initializeAWS,
// } from "../../services/awsServices";

// export const useAudioRecording = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [error, setError] = useState(null);

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   // Initialize AWS on component mount
//   useEffect(() => {
//     try {
//       initializeAWS();
//     } catch (error) {
//       console.error("Failed to initialize AWS:", error);
//       setError(error.message);
//     }
//   }, []);

//   const startRecording = async () => {
//     try {
//       setError(null);

//       // Check for microphone support
//       if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
//         throw new Error("Your browser doesn't support audio recording");
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: {
//           sampleRate: 44100, // Changed from 16000 to standard 44100
//           channelCount: 1,
//           echoCancellation: true,
//           noiseSuppression: true,
//           autoGainControl: true,
//         },
//       });

//       streamRef.current = stream;
//       audioChunksRef.current = [];

//       // Try different MIME types in order of preference
//       let mimeType = "audio/webm";
//       const supportedTypes = [
//         "audio/webm;codecs=opus",
//         "audio/webm",
//         "audio/mp4",
//         "audio/ogg;codecs=opus",
//         "audio/wav",
//       ];

//       for (const type of supportedTypes) {
//         if (MediaRecorder.isTypeSupported(type)) {
//           mimeType = type;
//           console.log(`Using MIME type: ${mimeType}`);
//           break;
//         }
//       }

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType,
//         audioBitsPerSecond: 128000, // Add explicit bitrate
//       });
//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         console.log(`Data available: ${event.data.size} bytes`);
//         if (event.data && event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         console.log(`Total chunks collected: ${audioChunksRef.current.length}`);
//         console.log(
//           `Chunk sizes:`,
//           audioChunksRef.current.map((chunk) => chunk.size)
//         );

//         const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
//         console.log(`Final blob size: ${audioBlob.size} bytes`);

//         if (audioBlob.size > 0) {
//           await handleTranscription(audioBlob);
//         } else {
//           setError(
//             "No audio data was recorded. Please try speaking louder or check your microphone."
//           );
//         }
//       };

//       mediaRecorder.onstart = () => {
//         console.log("MediaRecorder started");
//       };

//       mediaRecorder.onerror = (event) => {
//         console.error("MediaRecorder error:", event.error);
//         setError("Recording error occurred");
//         setIsListening(false);
//       };

//       // Start recording - don't use timeslice for now to avoid issues
//       mediaRecorder.start();
//       setIsListening(true);
//       console.log("Recording started with MIME type:", mimeType);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       let errorMessage = "Could not start recording";

//       if (error.name === "NotAllowedError") {
//         errorMessage =
//           "Microphone access denied. Please allow microphone permissions.";
//       } else if (error.name === "NotFoundError") {
//         errorMessage = "No microphone found. Please connect a microphone.";
//       } else if (error.name === "NotSupportedError") {
//         errorMessage = "Your browser doesn't support audio recording.";
//       }

//       setError(errorMessage);
//     }
//   };

//   const stopRecording = () => {
//     try {
//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state === "recording"
//       ) {
//         console.log("Stopping MediaRecorder...");
//         mediaRecorderRef.current.stop();
//       }

//       // Don't stop the stream immediately - let the MediaRecorder finish processing
//       setTimeout(() => {
//         if (streamRef.current) {
//           streamRef.current.getTracks().forEach((track) => {
//             track.stop();
//             console.log("Audio track stopped");
//           });
//         }
//       }, 100);

//       setIsListening(false);
//     } catch (error) {
//       console.error("Error stopping recording:", error);
//       setError("Error stopping recording");
//     }
//   };

//   const handleTranscription = async (audioBlob) => {
//     try {
//       setIsProcessing(true);
//       setError(null);

//       console.log("Starting transcription process...", {
//         blobSize: audioBlob.size,
//         blobType: audioBlob.type,
//       });

//       if (audioBlob.size === 0) {
//         throw new Error(
//           "No audio data recorded. Please ensure you're speaking and your microphone is working."
//         );
//       }

//       // Minimum size check (roughly 1 second of audio should be > 1KB)
//       if (audioBlob.size < 1000) {
//         console.warn(
//           "Audio blob is very small, this might indicate a recording issue"
//         );
//       }

//       // Upload to S3
//       console.log("Uploading to S3...");
//       const s3Uri = await uploadToS3(audioBlob);
//       console.log("Upload successful, starting transcription...");

//       // Transcribe audio
//       const transcriptionText = await transcribeAudio(s3Uri);
//       console.log("Transcription completed:", transcriptionText);

//       if (!transcriptionText || transcriptionText.trim().length === 0) {
//         throw new Error(
//           "No speech was detected in the audio. Please try speaking more clearly."
//         );
//       }

//       setTranscript(transcriptionText);
//     } catch (error) {
//       console.error("Transcription error:", error);
//       setError(`Transcription failed: ${error.message}`);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const clearTranscript = () => {
//     setTranscript("");
//     setError(null);
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   const cleanup = () => {
//     try {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach((track) => track.stop());
//       }

//       if (
//         mediaRecorderRef.current &&
//         mediaRecorderRef.current.state === "recording"
//       ) {
//         mediaRecorderRef.current.stop();
//       }
//     } catch (error) {
//       console.error("Cleanup error:", error);
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return cleanup;
//   }, []);

//   return {
//     isListening,
//     isProcessing,
//     transcript,
//     error,
//     startRecording,
//     stopRecording,
//     clearTranscript,
//     clearError,
//     cleanup,
//   };
// };






// import { useState, useRef } from "react";
// import { uploadToS3, transcribeAudio } from "../../services/awsServices";

// export const useAudioRecording = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");

//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const streamRef = useRef(null);

//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: {
//           sampleRate: 16000,
//           channelCount: 1,
//           echoCancellation: true,
//           noiseSuppression: true,
//         },
//       });

//       streamRef.current = stream;
//       audioChunksRef.current = [];

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = async () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/webm;codecs=opus",
//         });
//         await handleTranscription(audioBlob);
//       };

//       mediaRecorder.start(1000);
//       setIsListening(true);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       alert("Could not access microphone. Please check permissions.");
//     }
//   };

//   const stopRecording = () => {
//     if (
//       mediaRecorderRef.current &&
//       mediaRecorderRef.current.state === "recording"
//     ) {
//       mediaRecorderRef.current.stop();
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//     }

//     setIsListening(false);
//   };

//   const handleTranscription = async (audioBlob) => {
//     try {
//       const s3Uri = await uploadToS3(audioBlob);
//       const transcriptionText = await transcribeAudio(s3Uri);
//       setTranscript(transcriptionText);
//     } catch (error) {
//       console.error("Transcription error:", error);
//       alert("Transcription failed. Please try again.");
//     }
//   };

//   const cleanup = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//     }
//   };

//   return {
//     isListening,
//     transcript,
//     startRecording,
//     stopRecording,
//     cleanup,
//   };
// };
