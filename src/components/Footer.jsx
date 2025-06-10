import React from "react";
import { styles } from "../styles";
import footerBackground from "../assets/footer.png";

const Footer = () => {
  return (
    <div className="relative w-full -mt-20 -z-10">
      {/* Background Image */}
      <img
        src={footerBackground}
        alt="Footer background"
        className="w-full h-auto object-cover"
      />

      {/* Footer Content Overlay */}
      <div
        className={`${styles.paddingX} ${styles.paddingY} font-navbar absolute bottom-0 left-0 right-0 z-10`}
      >
        <div
          className={`${styles.headerSubText} flex items-center justify-between mx-auto`}
        >
          <div className="text-white font-bold">LOGO</div>
          <div className={`${styles.sectionSubText} text-white`}>
            © 2025. All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
