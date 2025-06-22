import React from "react";

const ScenarioCard = ({ title, description, difficulty, onClick, symbol }) => {
  return (
    <div
      className="mt-4 relative w-full group cursor-pointer h-full"
      onClick={onClick}
    >
      {/* Shadow layer */}
      <div className="absolute inset-0 bg-buttonshadow rounded-xl translate-y-2 transition-transform duration-150" />

      {/* Main Card */}
      <div
        className="relative bg-white rounded-xl border-2 border-buttonshadow
        p-4 sm:p-5 flex flex-row gap-4
        transition-all duration-150 group-active:translate-y-2 h-full"
      >
        {/* Image/Placeholder */}
        <div className="hidden xl:flex w-24 h-20 sm:w-28 sm:h-24 rounded-lg flex-shrink-0 items-center justify-center text-7xl leading-none">
          {symbol}
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-black font-heading mb-1">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-textgray-dark font-body leading-snug">
              {description}
            </p>
          </div>
          {typeof difficulty === "number" && (
            <span className="text-xs text-gray-500 font-medium mt-2">
              Difficulty: {difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
