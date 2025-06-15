import React from "react";

const LeftSidebar = ({
  showLeftSidebar,
  setShowLeftSidebar,
  transcript,
  notes,
  setNotes,
}) => {
  return (
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
          <CloseIcon />
        </button>

        <ScenarioSection />
        <ContextSection />
        {transcript && <TranscriptSection transcript={transcript} />}
        <NotesSection notes={notes} setNotes={setNotes} />
        <TipsSection />
        <CommonPhrasesSection />
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

const ScenarioSection = () => (
  <div className="mb-6 sm:mb-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-2 underline">Scenario:</h2>
    <p className="text-base sm:text-lg">Restaurant Order</p>
  </div>
);

const ContextSection = () => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Context:</h3>
    <div className="space-y-1 text-sm sm:text-base">
      <p>Restaurant: Redwood</p>
      <p>Menu: Chicken, Beef,</p>
      <p>Pho, Soup</p>
    </div>
  </div>
);

const TranscriptSection = ({ transcript }) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">
      Last Transcript:
    </h3>
    <div className="bg-white/10 p-3 rounded-lg">
      <p className="text-sm sm:text-base">{transcript}</p>
    </div>
  </div>
);

const NotesSection = ({ notes, setNotes }) => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Your notes:</h3>
    <textarea
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      className="w-full h-24 sm:h-32 p-3 bg-white text-black rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-highlight text-sm sm:text-base"
      placeholder="Add your notes here..."
    />
  </div>
);

const TipsSection = () => (
  <div className="mb-6 sm:mb-8">
    <h3 className="text-lg sm:text-xl font-bold mb-4 underline">Tips:</h3>
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
);

const CommonPhrasesSection = () => (
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
);

export default LeftSidebar;
