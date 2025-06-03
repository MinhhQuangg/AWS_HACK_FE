import React, { use } from "react";
import { styles } from "../../../styles";
import { AIAvatar } from "../../../assets/styles";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 lg:h-screen md:h-[80vh] sm:h-[60vh] h-[40vh] items-center justify-items-center gap-4">
      <div className="col-span-1 flex items-center justify-center">
        <img
          src={AIAvatar}
          key="Avatar"
          alt="AI Avatar"
          className="2xl:w-[660px] 2xl:h-[660px] xl:w-[660px] xl:h-[660px] lg:w-[500px] lg:h-[500px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px] w-[200px] h-[200px] object-cover object-center"
        />
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center xl:gap-8 gap-2">
        <div className={`${styles.headerText} text-center text-primary-dark`}>
          You're not alone.
        </div>
        <div className={`${styles.headerText} text-center text-primary-dark`}>
          Let's practice together.
        </div>
        <div className={`${styles.headerSubText} w-[80%] text-center`}>
          Build confidence and social skills with guided, friendly practice
          every day.
        </div>
        <Button
        className="lg:w-[300px] md:w-[200px] sm:w-[100px]"
          onClick={() => {
            navigate("/signin");
          }}
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
};

export default Hero;
