import React from "react";
import MainNavbar from "./MainNavbar";
import MobileActionButtons from "./MobileActionButtons";

const ConversationHeader = ({
  showLeftSidebar,
  setShowLeftSidebar,
  showRightSidebar,
  setShowRightSidebar,
}) => {
  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-4 relative">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Main Navigation */}
        <MainNavbar />

        {/* Mobile Action Buttons (Notes & AI Help) */}
        <MobileActionButtons
          showLeftSidebar={showLeftSidebar}
          setShowLeftSidebar={setShowLeftSidebar}
          showRightSidebar={showRightSidebar}
          setShowRightSidebar={setShowRightSidebar}
        />
      </nav>
    </header>
  );
};

export default ConversationHeader;
