import React, { useState, useEffect } from "react";
import ConversationHeader from "./ConversationHeader";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import ConversationCenter from "./ConversationCenter";
import { useAudioRecording } from "../../components/hooks/useAudioRecording";
import { useTextToSpeech } from "../../components/hooks/useTextToSpeech";
import { initializeAWS } from "../../services/awsServices";

export default function Conversation() {
  const [notes, setNotes] = useState("Waiter's name is Clint |");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

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
          />
        </div>

        <RightSidebar
          showRightSidebar={showRightSidebar}
          setShowRightSidebar={setShowRightSidebar}
          onSuggestionClick={handleSuggestionClick}
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
