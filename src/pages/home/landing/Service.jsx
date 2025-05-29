import React from "react";
import { styles } from "../../../styles";
import {
  bot,
  conversation,
  mic,
  progress,
  scenario,
  setting,
} from "../../../assets/styles";

const services = [
  {
    title: "Scenario-Based",
    description:
      "Choose from real-life situations like meeting new classmates, job interviews, or working in a group.",
    icon: scenario,
  },
  {
    title: "Voice Interaction",
    description:
      "Speak naturally with AI using voice input and output powered by Amazon Transcribe and Polly.",
    icon: mic,
  },
  {
    title: "Adaptive AI Characters",
    description:
      "Talk with different personalities and difficulty levels, powered by Amazon Bedrock.",
    icon: bot,
  },
  {
    title: "Accessibility",
    description:
      "Adjust voice speed, text size, color themes, and difficulty settings to suit your learning",
    icon: setting,
  },
  {
    title: "Progress Tracking",
    description:
      "View your session history, personal achievements, and growth over time.",
    icon: progress,
  },
  {
    title: "Real-Time Conversation",
    description:
      "Get supportive coaching on your tone, timing, and content after each session.",
    icon: conversation,
  },
];

const Service = () => {
  return (
    <div className="relative w-full mx-auto px-4 mb-[300px]">
      <div
        className={`${styles.headerText} text-center text-primary-dark md:mb-28 mb-10`}
      >
        What do we do
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-24 gap-14 md:max-w-[1300px] mx-auto">
        {services.map(({ title, description, icon }, index) => (
          <div
            key={index}
            className="relative bg-primary p-6 rounded-lg shadow-md text-center pt-10"
          >
            {/* Icon in top-left circle */}
            <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-secondary w-16 h-16 rounded-full flex items-center justify-center shadow-md text-2xl">
                <img src={icon} alt={`${title} icon`} className="w-10 h-10" />
              </div>
            </div>

            <div
              className={`${styles.sectionHeadText} text-bg-light font-bold mb-5`}
            >
              {title}
            </div>
            <div className={`${styles.sectionSubText} text-bg-dark`}>
              {description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
