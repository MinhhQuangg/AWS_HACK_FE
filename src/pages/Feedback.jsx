import React from "react";
import { AIAvatar } from "../assets/styles";
import AuthNav from "../components/AuthNav";
import Footer from "../components/Footer";
import { styles } from "../styles";

const Feedback = () => {
  return (
    <div className="flex flex-col justify-between xl:gap-20 md:gap-32 sm:gap-40 gap-48">
      <AuthNav />
      <div className="flex flex-col gap-3">
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
              Ordering at a restaurant
            </div>
            <div className={`${styles.sectionSubText} `}>
              You met Clint, ordered chicken, and asked about the restaurant.
              View conversation log in History.
            </div>
            <div className={`${styles.sectionSubText} text-right`}>
              05/13/2025
            </div>
          </div>
        </div>
        <div className="lg:w-[42%] sm:w-[50%] w-[60%] mx-auto flex gap-3 justify-center items-center mt-5">
          {/* 'Good' as button-styled div */}
          <div className="w-full text-center font-['Inter'] bg-[#44C760] font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150">
            Good
          </div>

          {/* 'Get Started' button with shadow/depth */}
          <div className="relative w-full">
            {/* Background shadow layer */}
            <button className="absolute top-2 left-1/2 -translate-x-1/2 w-full font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0 pointer-events-none">
              &nbsp;
            </button>

            {/* Foreground button */}
            <button className="relative z-10 left-1/2 -translate-x-1/2 w-full font-['Inter'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner">
              Review
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
