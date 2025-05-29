import React from "react";
import { AIAvatar } from "../../../assets/styles";
import { styles } from "../../../styles";

const Mission = () => {
  return (
    <div className="relative w-full mb-[200px] mx-auto">
      {/* Heading */}
      <div
        className={`${styles.headerText} text-center text-primary-dark md:mb-20 sm:mb-10 mb-3`}
      >
        How We Help You
      </div>

      {/* Container for missions and avatar */}
      <div className="relative w-full md:h-[600px] sm:h-[500px] h-[400px]">
        {/* Mission 1 - Top Left */}
        <div
          className={`absolute top-0 left-0 xl:w-[600px] md:w-[500px] sm:w-[350px] w-[250px] p-4 bg-primary-light text-left`}
        >
          <div
            className={`${styles.sectionHeadText} w-[80%] text-secondary-dark font-bold`}
          >
            Empower Social Confidence
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] text-textgray-dark mt-3`}
          >
            Help autistic students feel more comfortable and confident in
            everyday conversations.
          </div>
        </div>

        {/* Mission 2 - Top Right */}
        <div
          className={`absolute top-0 right-0 xl:w-[600px] md:w-[500px] sm:w-[350px] w-[250px] p-4 bg-primary-light text-right`}
        >
          <div
            className={`${styles.sectionHeadText} w-[80%] ml-auto text-secondary-dark font-bold`}
          >
            Practical Communication Skills
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] ml-auto text-textgray-dark mt-3`}
          >
            Help autistic students feel more comfortable and confident in
            everyday conversations.
          </div>
        </div>

        {/* Mission 3 - Bottom Left */}
        <div
          className={`absolute bottom-0 leftt-0  xl:w-[600px] md:w-[500px] sm:w-[350px] w-[250px] p-4 bg-primary-light`}
        >
          <div
            className={`${styles.sectionHeadText} w-[80%] text-secondary-dark font-bold`}
          >
            Promote Personalized Learning
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] text-textgray-dark mt-3`}
          >
            Provide adaptive simulations that match each student's pace and
            communication style.
          </div>
        </div>

        {/* Mission 4 - Bottom Right */}
        <div
          className={`absolute bottom-0 right-0 xl:w-[600px] md:w-[500px] sm:w-[350px] w-[250px] p-4 bg-primary-light text-right`}
        >
          <div
            className={`${styles.sectionHeadText} w-[80%] ml-auto text-secondary-dark font-bold`}
          >
            Deliver Meaningful Feedback
          </div>
          <div
            className={`${styles.sectionSubText} w-[80%] ml-auto text-textgray-dark mt-3`}
          >
            Give helpful, real-time feedback on tone, timing, and expression
            using AI.
          </div>
        </div>

        {/* Avatar centered below the heading */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={AIAvatar}
            alt="Avatar"
            className="2xl:w-[660px] 2xl:h-[660px] xl:w-[580px] xl:h-[580px] lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[200px] h-[200px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Mission;
