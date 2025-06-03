import React from "react";
import { AIAvatar } from "../../../assets/styles";
import { styles } from "../../../styles";

const Mission = () => {
  return (
    <div className="relative w-full mt-[100px] mb-[100px] mx-auto px-4">
      {/* Heading */}
      <div
        className={`${styles.headerText} text-center text-primary-dark md:mb-20 sm:mb-10 mb-8`}
      >
        How We Help You
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="flex flex-col items-center justify-center space-y-6 md:hidden">
        {/* Avatar */}
        <div className="flex justify-center mb-8 bg-highlight w-32 h-32 rounded-full">
          <img
            src={AIAvatar}
            alt="AI Avatar"
            className="w-32 h-32 object-cover rounded-full shadow-lg"
          />
        </div>

        {/* Mission Cards - Stacked */}
        <div className="space-y-4">
          <div className="p-4 bg-primary-light rounded-lg shadow-sm">
            <div
              className={`${styles.sectionHeadText} text-secondary-dark font-bold text-lg mb-2`}
            >
              Empower Social Confidence
            </div>
            <div
              className={`${styles.sectionSubText} text-textgray-dark text-sm`}
            >
              Help autistic students feel more comfortable and confident in
              everyday conversations.
            </div>
          </div>

          <div className="p-4 bg-primary-light rounded-lg shadow-sm">
            <div
              className={`${styles.sectionHeadText} text-secondary-dark font-bold text-lg mb-2`}
            >
              Practical Communication Skills
            </div>
            <div
              className={`${styles.sectionSubText} text-textgray-dark text-sm`}
            >
              Teach practical skills for real-world social interactions and
              workplace communication.
            </div>
          </div>

          <div className="p-4 bg-primary-light rounded-lg shadow-sm">
            <div
              className={`${styles.sectionHeadText} text-secondary-dark font-bold text-lg mb-2`}
            >
              Promote Personalized Learning
            </div>
            <div
              className={`${styles.sectionSubText} text-textgray-dark text-sm`}
            >
              Provide adaptive simulations that match each student's pace and
              communication style.
            </div>
          </div>

          <div className="p-4 bg-primary-light rounded-lg shadow-sm">
            <div
              className={`${styles.sectionHeadText} text-secondary-dark font-bold text-lg mb-2`}
            >
              Deliver Meaningful Feedback
            </div>
            <div
              className={`${styles.sectionSubText} text-textgray-dark text-sm`}
            >
              Give helpful, real-time feedback on tone, timing, and expression
              using AI.
            </div>
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Layout - Positioned */}
      <div className="hidden md:block relative w-full 2xl:h-[800px] xl:h-[700px] lg:h-[600px] md:h-[500px] max-w-7xl mx-auto">
        {/* Mission 1 - Top Left */}
        <div className="absolute top-0 left-0 2xl:w-[45%] xl:w-[45%] lg:w-[42%] md:w-[40%] p-4 lg:p-6 bg-primary-light text-left rounded-lg shadow-sm">
          <div
            className={`${styles.sectionHeadText} w-[80%] text-secondary-dark font-bold md:text-lg lg:text-xl`}
          >
            Empower Social Confidence
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] text-textgray-dark mt-3 md:text-sm lg:text-base`}
          >
            Help autistic students feel more comfortable and confident in
            everyday conversations.
          </div>
        </div>

        {/* Mission 2 - Top Right */}
        <div className="absolute top-0 right-0 2xl:w-[45%] xl:w-[45%] lg:w-[42%] md:w-[40%] p-4 lg:p-6 bg-primary-light text-right rounded-lg shadow-sm">
          <div
            className={`${styles.sectionHeadText} w-[80%] ml-auto text-secondary-dark font-bold md:text-lg lg:text-xl`}
          >
            Practical Communication Skills
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] ml-auto text-textgray-dark mt-3 md:text-sm lg:text-base`}
          >
            Teach practical skills for real-world social interactions and
            workplace communication.
          </div>
        </div>

        {/* Mission 3 - Bottom Left */}
        <div className="absolute bottom-0 left-0 2xl:w-[45%] xl:w-[45%] lg:w-[42%] md:w-[40%] p-4 lg:p-6 bg-primary-light rounded-lg shadow-sm">
          <div
            className={`${styles.sectionHeadText} w-[80%] text-secondary-dark font-bold md:text-lg lg:text-xl`}
          >
            Promote Personalized Learning
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] text-textgray-dark mt-3 md:text-sm lg:text-base`}
          >
            Provide adaptive simulations that match each student's pace and
            communication style.
          </div>
        </div>

        {/* Mission 4 - Bottom Right */}
        <div className="absolute bottom-0 right-0 2xl:w-[45%] xl:w-[45%] lg:w-[42%] md:w-[40%] p-4 lg:p-6 bg-primary-light text-right rounded-lg shadow-sm">
          <div
            className={`${styles.sectionHeadText} w-[80%] ml-auto text-secondary-dark font-bold md:text-lg lg:text-xl`}
          >
            Deliver Meaningful Feedback
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] ml-auto text-textgray-dark mt-3 md:text-sm lg:text-base`}
          >
            Give helpful, real-time feedback on tone, timing, and expression
            using AI.
          </div>
        </div>

        {/* Connecting Lines SVG */}
        <svg
          className="text-primary absolute inset-0 w-full h-full pointer-events-none opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <line
            x1="50"
            y1="50"
            x2="20"
            y2="15"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <line
            x1="50"
            y1="50"
            x2="80"
            y2="15"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <line
            x1="50"
            y1="50"
            x2="20"
            y2="85"
            stroke="currentColor"
            strokeWidth="0.75"
          />
          <line
            x1="50"
            y1="50"
            x2="80"
            y2="85"
            stroke="currentColor"
            strokeWidth="0.75"
          />
        </svg>

        {/* Avatar centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <img
            src={AIAvatar}
            alt="AI Avatar"
            className="2xl:w-[300px] 2xl:h-[300px] xl:w-[280px] xl:h-[280px] lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Mission;
