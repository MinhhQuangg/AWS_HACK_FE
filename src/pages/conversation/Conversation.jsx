import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import MainNavbar from "../../components/MainNavbar";
import ConversationHeader from "./ConversationHeader";
import Button from "../../components/common/Button";

export default function Conversation() {
  const [isListening, setIsListening] = useState(false);
  const [notes, setNotes] = useState("Waiter's name is Clint |");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const handleMicToggle = () => {
    setIsListening(!isListening);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  // mock AI suggestions
  const suggestions = [
    {
      number: 1,
      text: "Say hello and ask for your options.",
    },
    {
      number: 2,
      text: "Ask for details on the dish you like.",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light font-body overflow-hidden">
      {/* Header Navigation */}
      <ConversationHeader
        showLeftSidebar={showLeftSidebar}
        setShowLeftSidebar={setShowLeftSidebar}
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
      />
      {/* <MainNavbar /> */}

      <div
        className="flex relative"
        // style={{ marginTop: "100px", height: "calc(100vh - 100px)" }}
      >
        {/* Left Sidebar - Mobile Overlay */}
        <div
          className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-secondary transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-0
          ${
            showLeftSidebar
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
          style={{ top: "100px", height: "calc(100vh - 100px)" }}
        >
          <div className="p-4 sm:p-6 text-white h-full overflow-y-auto overflow-x-hidden">
            {/* Mobile Close Button */}
            <button
              onClick={() => setShowLeftSidebar(false)}
              className="lg:hidden absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg"
            >
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
            </button>

            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 underline">
                Scenario:
              </h2>
              <p className="text-base sm:text-lg">Restaurant Order</p>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
                Context:
              </h3>
              <div className="space-y-1 text-sm sm:text-base">
                <p>Restaurant: Redwood</p>
                <p>Menu: Chicken, Beef,</p>
                <p>Pho, Soup</p>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
                Your notes:
              </h3>
              <textarea
                value={notes}
                onChange={handleNotesChange}
                className="w-full h-24 sm:h-32 p-3 bg-white text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-highlight text-sm sm:text-base"
                placeholder="Add your notes here..."
              />
            </div>

            {/* Additional content to test scrolling */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
                Tips:
              </h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p>• Be polite and courteous</p>
                <p>• Ask about specials</p>
                <p>• Check for allergies</p>
                <p>• Don't forget to tip</p>
                <p>• Practice active listening</p>
                <p>• Take your time deciding</p>
                <p>• Ask for recommendations</p>
                <p>• Confirm your order</p>
                <p>• Thank the staff</p>
                <p>• Enjoy your meal</p>
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
                Common Phrases:
              </h3>
              <div className="space-y-2 text-sm sm:text-base">
                <p>"Could I see the menu please?"</p>
                <p>"What do you recommend?"</p>
                <p>"I'll have the..."</p>
                <p>"Could I get that medium rare?"</p>
                <p>"Is this gluten-free?"</p>
                <p>"Could I have the check please?"</p>
                <p>"Thank you for your service"</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay Background */}
        {showLeftSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowLeftSidebar(false)}
          />
        )}

        {/* Main Content Area */}
        <div
          className="flex-1 flex flex-col lg:flex-row"
          style={{ marginTop: "100px", height: "calc(100vh - 100px)" }}
        >
          {/* Center Conversation Area */}
          <div className="flex-1 flex flex-col items-center justify-center bg-bg-dark relative px-4 sm:px-6 py-8 overflow-hidden">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-primary-dark mb-2 sm:mb-4">
                Live Conversation
              </h1>
              <p className="font-body text-base sm:text-lg text-textgray-dark">
                Hold the spacebar to speak
              </p>
            </div>

            {/* Robot Avatar */}
            <div className="mb-6 sm:mb-8">
              <div className="w-38 h-38 sm:w-46 sm:h-46 lg:w-54 lg:h-54 rounded-full bg-highlight flex items-center justify-center">
                <img
                  src="/src/assets/robot2.png"
                  alt="AI Robot Assistant"
                  className="w-76 h-76 sm:w-80 sm:h-80 lg:w-88 lg:h-88 object-contain"
                />
              </div>
            </div>

            {/* Microphone Button */}
            {/* <button
              onClick={handleMicToggle}
              onMouseDown={() => setIsListening(true)}
              onMouseUp={() => setIsListening(false)}
              onMouseLeave={() => setIsListening(false)}
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 scale-110"
                  : "bg-secondary hover:bg-secondary-dark"
              } shadow-lg`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              ) : (
                <Mic className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              )}
            </button> */}
            <button
              onClick={handleMicToggle}
              className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 scale-110"
                  : "bg-secondary hover:bg-secondary-dark"
              } shadow-lg`}
            >
              {isListening ? (
                <MicOff className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              ) : (
                <Mic className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
              )}
            </button>
          </div>
        </div>
        {/* Right Sidebar - Mobile Overlay */}
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
            </button>

            {/* AI Suggestion Input */}
            <div className="mb-6 mt-8 lg:mt-0">
              <textarea
                className="w-full h-16 sm:h-20 p-3 rounded-lg bg-bg-light text-textgray-dark resize-none text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-highlight"
                placeholder="Ask AI for a suggestion on the conversation..."
              />
              <Button>AI Suggestion ✨</Button>
            </div>

            {/* Suggestion Cards */}
            <div className="space-y-3 sm:space-y-4">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="bg-primary rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base`}
                    >
                      {suggestion.number}
                    </div>
                  </div>
                  <p className="text-white text-sm sm:text-base">
                    {suggestion.text}
                  </p>
                </div>
              ))}

              {/* Additional suggestion cards to test scrolling */}
              <div className="bg-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    3
                  </div>
                </div>
                <p className="text-white text-sm sm:text-base">
                  Ask about daily specials or chef recommendations.
                </p>
              </div>

              <div className="bg-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    4
                  </div>
                </div>
                <p className="text-white text-sm sm:text-base">
                  Inquire about portion sizes if you're unsure.
                </p>
              </div>

              <div className="bg-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    5
                  </div>
                </div>
                <p className="text-white text-sm sm:text-base">
                  Mention any dietary restrictions or allergies.
                </p>
              </div>

              <div className="bg-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    6
                  </div>
                </div>
                <p className="text-white text-sm sm:text-base">
                  Ask about cooking preferences for meat dishes.
                </p>
              </div>

              <div className="bg-primary rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                    7
                  </div>
                </div>
                <p className="text-white text-sm sm:text-base">
                  Don't forget to order drinks and sides.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Overlay Background for Right Sidebar */}
        {showRightSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowRightSidebar(false)}
          />
        )}
      </div>
    </div>
  );
}
