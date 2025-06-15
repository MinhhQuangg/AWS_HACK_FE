import React from "react";
import { Volume2 } from "lucide-react";
import Button from "../../components/common/Button";

const RightSidebar = ({
  showRightSidebar,
  setShowRightSidebar,
  onSuggestionClick,
}) => {
  const suggestions = [
    { number: 1, text: "Say hello and ask for your options." },
    { number: 2, text: "Ask for details on the dish you like." },
    { number: 3, text: "Ask about daily specials or chef recommendations." },
    { number: 4, text: "Inquire about portion sizes if you're unsure." },
    { number: 5, text: "Mention any dietary restrictions or allergies." },
    { number: 6, text: "Ask about cooking preferences for meat dishes." },
    { number: 7, text: "Don't forget to order drinks and sides." },
  ];

  return (
    <div
      className={`
        fixed inset-y-0 right-0 z-50 w-80 bg-secondary transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:z-0 lg:w-80
        ${
          showRightSidebar
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }
      `}
      style={{ top: "100px", height: "calc(100vh - 100px)" }}
    >
      <div className="p-4 sm:p-6 h-full overflow-y-auto overflow-x-hidden">
        {/* Mobile Close Button */}
        <button
          onClick={() => setShowRightSidebar(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
        >
          <CloseIcon />
        </button>

        <AISuggestionInput />
        <SuggestionsList
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const AISuggestionInput = () => (
  <div className="mb-6 mt-8 lg:mt-0">
    <textarea
      className="w-full h-16 sm:h-20 p-3 rounded-lg bg-bg-light text-textgray-dark resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-highlight"
      placeholder="Ask AI for a suggestion on the conversation..."
    />
    <Button>AI Suggestion ✨</Button>
  </div>
);

const SuggestionsList = ({ suggestions, onSuggestionClick }) => (
  <div className="space-y-3 sm:space-y-4">
    {suggestions.map((suggestion, index) => (
      <SuggestionCard
        key={index}
        suggestion={suggestion}
        onSuggestionClick={onSuggestionClick}
      />
    ))}
  </div>
);

const SuggestionCard = ({ suggestion, onSuggestionClick }) => (
  <div
    className="bg-primary rounded-lg p-3 sm:p-4 cursor-pointer hover:bg-primary-dark transition-colors"
    onClick={() => onSuggestionClick(suggestion.text)}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
        {suggestion.number}
      </div>
      <Volume2 className="w-4 h-4 text-white opacity-70" />
    </div>
    <p className="text-white text-sm sm:text-base">{suggestion.text}</p>
  </div>
);

export default RightSidebar;
