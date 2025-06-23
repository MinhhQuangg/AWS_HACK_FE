import React, { useEffect, useState } from "react";
import { AIAvatar } from "../assets/styles";
import AuthNav from "../components/AuthNav";
import Footer from "../components/Footer";
import { styles } from "../styles";
import {
  showToastError,
  showToastSuccess,
} from "../components/common/ShowToast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Volume2 } from "lucide-react";
import { useTextToSpeech } from "../components/hooks/useTextToSpeech";

const Feedback = () => {
  const [notes, setNotes] = useState(
    "Your introduction is clear and confident, which sets a positive tone for professional interactions.Consider adding a brief mention of your role or expertise to give more context about your background.Try to maintain a friendly yet formal tone to make a strong first impression."
  );
  const [scenarioId, setScenarioId] = useState(null);
  const { sessionId } = useParams();
  const [loading, setLoading] = useState(false);
  const { speakText } = useTextToSpeech();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    const fetchFeedback = async () => {
      setLoading(true); // start loading
      try {
        const response = await axios.get(
          `http://localhost:5000/api/feedbacks/${sessionId}`
        );
        const feedbackText = response?.data?.feedback?.feedback;
        showToastSuccess("Your feedback is generated. Please wait!");
        setNotes(feedbackText);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false); // end loading regardless of success/error
      }
    };

    fetchFeedback();
  }, [sessionId]);
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/sessions/session/${sessionId}`
        );
        setScenarioId(res?.data?.scenarioId);
      } catch (err) {
        console.error("Failed to fetch session data:", err);
        // showToastError("Unable to load session");
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId]);
  const handleSuggestionClick = (suggestionText) => {
    speakText(suggestionText);
  };

  return (
    <div className="flex flex-col justify-between xl:gap-20 md:gap-32 sm:gap-40 gap-48">
      <AuthNav />
      <div className="flex flex-col gap-3 mt-[50px]">
        <img
          src={AIAvatar}
          key="Avatar"
          className="2xl:w-[500px] 2xl:h-[500px] xl:w-[500px] xl:h-[500px] lg:w-[300px] lg:h-[300px] md:w-[300px] md:h-[300px] sm:w-[250px] sm:h-[250px] w-[200px] h-[200px] object-cover mx-auto mb-5"
        />
        <div className={`${styles.headerText} text-center text-primary-dark`}>
          Well Done! You Did It!
        </div>
        <div
          className={`${styles.headerSubText} text-center text-primary-dark gap-12 font-['Fredoka]`}
        >
          Conversation added to History.
        </div>
        <div className="grid grid-cols-4 lg:w-[42%] sm:w-[50%] w-[60%] gap-4 mx-auto mt-5 p-4 border border-gray-300 shadow-[0_4px_6px_-1px_rgba(107,114,128,0.9)] rounded-lg bg-white">
          <div className="col-span-1">
            <img
              src={AIAvatar}
              key="Avatar"
              className="2xl:w-[120px] 2xl:h-[120px] xl:w-[120px] xl:h-[120px] lg:w-[120px] lg:h-[120px] md:w-[100px] md:h-[100px] sm:w-[80px] sm:h-[80px] w-[70px] h-[70px] object-cover mx-auto mb-5"
            />
          </div>
          <div className="col-span-3 flex flex-col justify-between">
            <div className={`${styles.sectionHeadText} font-['Fredoka']`}>
              {scenarioId &&
                scenarioId
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </div>
            <div className={`${styles.sectionSubText} `}>
              {loading ? (
                <div className="text-left text-gray-500">
                  Loading feedback...
                </div>
              ) : (
                notes
              )}
              {!loading && notes && (
                <button
                  onClick={() => handleSuggestionClick(notes)}
                  aria-label="Play feedback audio"
                  className="p-2 rounded hover:bg-gray-200"
                >
                  <Volume2 className="w-4 h-4 opacity-70" />
                </button>
              )}
            </div>
            <div className={`${styles.sectionSubText} text-right`}>
              05/13/2025
            </div>
          </div>
        </div>
        <div className="lg:w-[42%] sm:w-[50%] w-[60%] mx-auto flex gap-3 justify-center items-center mt-5">
          {/* 'Good' as button-styled div */}

          {/* 'Get Started' button with shadow/depth */}
          <div className="relative w-[50%]">
            {/* Background shadow layer */}
            <button className="absolute top-2 left-1/2 -translate-x-1/2 w-full font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0 pointer-events-none">
              &nbsp;
            </button>

            {/* Foreground button */}
            <button
              className="relative z-10 left-1/2 -translate-x-1/2 w-full font-['Inter'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
              onClick={() => navigate("/")}
            >
              Homepage
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
