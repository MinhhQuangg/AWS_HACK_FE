import React, { useState, useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ConversationCenter from "./ConversationCenter";
import { useAudioRecording } from "../../components/hooks/useAudioRecording";
import { useTextToSpeech } from "../../components/hooks/useTextToSpeech";
import { initializeAWS } from "../../services/awsServices";
import { showToastError } from "../../components/common/ShowToast";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Conversation() {
  const { sessionId } = useParams();
  const [notes, setNotes] = useState("");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const [scenarioId, setScenarioId] = useState(null);

  // Custom hooks
  const {
    isListening,
    transcript,
    startRecording,
    stopRecording,
    setTranscript,
    cleanup: cleanupRecording,
  } = useAudioRecording();

  const { isSpeaking, audioElementRef, speakText, stopSpeaking } =
    useTextToSpeech();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/${sessionId}`
        );
        setScenarioId(res?.data?.scenarioId);
        console.log(res?.data?.scenarioId);
      } catch (err) {
        console.error("Failed to fetch session data:", err);
        showToastError("Unable to load session");
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);

  useEffect(() => {
    initializeAWS();
    return cleanupRecording;
  }, [cleanupRecording]);

  const handleMicToggle = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleSpeakToggle = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const textToSpeak =
        transcript ||
        "Hello! I'm ready to help you with your restaurant order.";
      speakText(textToSpeak);
    }
  };

  const handleSuggestionClick = (suggestionText) => {
    speakText(suggestionText);
  };
  const handleSendTranscript = async (transcript) => {
    try {
      const response = await axios.post("http://localhost:5000/api/messages", {
        message: transcript,
        sessionId,
      });

      // speakText(
      //   "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      // );
      // const audioUrl = response?.data?.audioUrl;

      // if (audioUrl) {
      //   speakText(audioUrl);
      // }
      speakText(response?.data?.text?.message);
    } catch (err) {
      showToastError(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light font-body overflow-hidden">
      <audio ref={audioElementRef} />

      <ConversationHeader
        showLeftSidebar={showLeftSidebar}
        setShowLeftSidebar={setShowLeftSidebar}
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
      />

      <div className="flex relative">
        <LeftSidebar
          showLeftSidebar={showLeftSidebar}
          setShowLeftSidebar={setShowLeftSidebar}
          transcript={transcript}
          notes={notes}
          setNotes={setNotes}
          speakText={speakText}
          scenario={scenarioId}
        />

        {/* Mobile Overlay Background */}
        {showLeftSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        <div
          className="flex-1 flex flex-col lg:flex-row"
          style={{ marginTop: "100px", height: "calc(100vh - 100px)" }}
        >
          <ConversationCenter
            isListening={isListening}
            isSpeaking={isSpeaking}
            onMicToggle={handleMicToggle}
            onSpeakToggle={handleSpeakToggle}
            transcript={transcript}
            setTranscript={setTranscript}
            sendTranscript={handleSendTranscript}
          />
        </div>

        <RightSidebar
          showRightSidebar={showRightSidebar}
          setShowRightSidebar={setShowRightSidebar}
          onSuggestionClick={handleSuggestionClick}
          scenario={scenarioId}
        />

        {/* Mobile Overlay Background for Right Sidebar */}
        {showRightSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowRightSidebar(false)}
          />
        )}
      </div>
    </div>
  );
}
