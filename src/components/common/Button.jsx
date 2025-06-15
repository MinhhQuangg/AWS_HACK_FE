import React from "react";
import { styles } from "../../styles";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`mt-3 relative group w-full sm:w-auto ${className}`}
      {...props}
    >
      {/* Shadow layer */}
      <div className="absolute inset-0 bg-primary-dark rounded-2xl translate-y-2.5 transition-transform duration-100  " />

      {/* Main button */}
      <div
        className={`
    font-heading relative bg-primary text-white rounded-2xl shadow-lg
    flex items-center justify-center space-x-2
    px-4 py-3 sm:px-6 sm:py-4
    text-sm md:text-base lg:text-lg
    transform transition-all duration-100 group-active:translate-y-2.5
  `}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
