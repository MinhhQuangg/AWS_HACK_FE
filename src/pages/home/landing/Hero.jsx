import React, { use } from "react";
import { styles } from "../../../styles";
import { AIAvatar } from "../../../assets/styles";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-3 lg:h-screen md:h-[80vh] sm:h-[60vh] h-[40vh] items-center justify-items-center gap-4">
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={AIAvatar}
          key="Avatar"
          className="2xl:w-[660px] 2xl:h-[660px] xl:w-[660px] xl:h-[660px] lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[200px] h-[200px] object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col items-center justify-center xl:gap-8 gap-2">
        <div className={`${styles.headerText} text-center text-primary-dark`}>
          Your are not alone.
        </div>
        <div className={`${styles.headerText} text-center text-primary-dark`}>
          Let's practice together.
        </div>
        <div className={`${styles.headerSubText} text-center`}>
          Build confidence and social skills with guided, friendly practice
          every day.
        </div>
        <div className="relative w-[80%] max-w-md mx-auto">
          {/* Bottom button (background layer) */}

          {/* Top button (floating on top of the bottom one) */}
          <button className="absolute top-2 left-1/2 -translate-x-1/2 w-[50%] font-['Inter'] bg-primary-dark text-black font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] shadow-inner z-0">
            h
          </button>

          {/* Top button (main button) */}
          <button
            className="relative z-10 left-1/2 -translate-x-1/2 w-[50%] font-['Inter'] bg-primary text-white font-bold text-[1.15rem] lg:text-[1.35rem] md:py-3 py-1 rounded-[10px] transition-all duration-150 active:translate-y-[2px] active:shadow-inner"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
