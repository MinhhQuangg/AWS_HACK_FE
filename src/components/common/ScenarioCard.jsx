import React from "react";

const ScenarioCard = () => {
  return (
    <div className="mt-3 relative w-full group cursor-pointer">
      <div className="absolute inset-0 bg-buttonshadow rounded-xl translate-y-2 transition-transform duration-100" />
      <div
        className="relative bg-white rounded-xl
        flex items-center space-x-2
        px-3 py-2 sm:px-4 sm:py-3
        text-sm md:text-sm lg:text-base
        transform transition-all duration-100 group-active:translate-y-2 border-2 border-buttonshadow"
      >
        <div className="flex items-start gap-4">
          {/* Gray placeholder rectangle */}
          <div className="w-24 h-16 sm:w-28 sm:h-20 bg-gray-300 rounded-lg flex-shrink-0" />

          {/* Text content */}
          <div className="flex-1">
            <h2 className="text-lg sm:text-xl font-bold text-black mb-2 font-heading">
              TITLE
            </h2>
            <p className="text-sm sm:text-base font-body text-textgray-dark leading-snug">
              Description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
