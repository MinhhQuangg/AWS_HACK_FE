import React from "react";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import {
  showToastError,
  showToastSuccess,
} from "../../components/common/ShowToast";

const ConversationCenter = ({
  isListening,
  isSpeaking,
  onMicToggle,
  onSpeakToggle,
  transcript,
  setTranscript,
  sendTranscript,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-bg-dark relative px-4 sm:px-6 py-8 overflow-hidden">
      <ConversationHeader isListening={isListening} isSpeaking={isSpeaking} />
      <RobotAvatar />
      <ControlButtons
        isListening={isListening}
        isSpeaking={isSpeaking}
        onMicToggle={onMicToggle}
        onSpeakToggle={onSpeakToggle}
        transcript={transcript}
      />
      <textarea
        className="w-[30%] h-16 sm:h-20 p-3 mb-[10px] rounded-lg bg-bg-light text-textgray-dark resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-highlight"
        value={transcript}
        placeholder="Your script will appear here"
        onChange={(e) => setTranscript(e.target.value)}
      />

      {/* Main Send button */}
      <button
        className="relative z-10 w-[10%] font-['Inter'] bg-primary text-white font-bold 
    text-[1.15rem] lg:text-[1.35rem] py-2 rounded-[10px] transition-all duration-150 
    active:translate-y-[2px] active:shadow-inner"
        onClick={() => sendTranscript(transcript)}
      >
        {"Send"}
      </button>
    </div>
  );
};

const ConversationHeader = ({ isListening, isSpeaking }) => (
  <div className="text-center mb-6 sm:mb-8">
    <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary-dark mb-2 sm:mb-4">
      Live Conversation
    </h1>
    <p className="font-body text-base sm:text-lg text-textgray-dark">
      Click microphone to speak, speaker to hear AI response
    </p>
    {isListening && (
      <p className="text-red-500 font-semibold mt-2">Recording...</p>
    )}
    {isSpeaking && (
      <p className="text-green-500 font-semibold mt-2">Speaking...</p>
    )}
  </div>
);

const RobotAvatar = () => (
  <div className="mb-6 sm:mb-8">
    <div className="w-38 h-38 sm:w-46 sm:h-46 lg:w-54 lg:h-54 rounded-full bg-highlight flex items-center justify-center">
      <img
        src="/src/assets/robot2.png"
        alt="AI Robot Assistant"
        className="w-76 h-76 sm:w-80 sm:h-80 lg:w-88 lg:h-88 object-contain"
      />
    </div>
  </div>
);

const ControlButtons = ({
  isListening,
  isSpeaking,
  onMicToggle,
  onSpeakToggle,
}) => (
  <div className="flex gap-4 mb-6">
    <MicrophoneButton isListening={isListening} onToggle={onMicToggle} />
    <SpeakerButton isSpeaking={isSpeaking} onToggle={onSpeakToggle} />
  </div>
);

const MicrophoneButton = ({ isListening, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
      isListening
        ? "bg-red-500 hover:bg-red-600 scale-110"
        : "bg-secondary hover:bg-secondary-dark"
    } shadow-lg`}
  >
    {isListening ? (
      <MicOff className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
    ) : (
      <Mic className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
    )}
  </button>
);

const SpeakerButton = ({ isSpeaking, onToggle }) => (
  <button
    onClick={onToggle}
    className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
      isSpeaking
        ? "bg-green-500 hover:bg-green-600 scale-110"
        : "bg-primary hover:bg-primary-dark"
    } shadow-lg`}
  >
    {isSpeaking ? (
      <VolumeX className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
    ) : (
      <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
    )}
  </button>
);

export default ConversationCenter;
