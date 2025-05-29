import React from "react";
import { styles } from "../styles";

const Footer = () => {
  return (
    <div className="relative ">
      {/* Left Eclipse */}
      <div
        className="absolute -top-40 -left-40 w-[400px] h-[400px] overflow-hidden z-0"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <div className="w-full h-full bg-primary rounded-full"></div>
      </div>
      <div
        className="absolute -top-20 left-40 w-[300px] h-[280px] overflow-hidden z-0"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <div className="w-full h-full bg-primary rounded-full"></div>
      </div>
      <div
        className="absolute -top-20 -right-40 w-[300px] h-[300px] overflow-hidden z-0"
        style={{ clipPath: "inset(0 0 50% 0)" }}
      >
        <div className="w-full h-full bg-primary rounded-full"></div>
      </div>

      {/* Navbar */}
      <div
        className={`${styles.paddingX} ${styles.paddingY} font-navbar bg-primary shadow-sm relative z-10`}
      >
        <div
          className={`${styles.headerSubText} flex items-center justify-between mx-auto`}
        >
          <div className="text-white font-bold">LOGO</div>
          <div className={`${styles.sectionSubText} text-white`}>
            @ 2025. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
