import React, { useState } from "react";

const MainNavbar = ({
  logo = "LOGO",
  navItems = [
    { name: "Home", href: "#" },
    { name: "Scenarios", href: "#" },
    { name: "History", href: "#" },
    { name: "About", href: "#" },
    { name: "Profile", href: "#" },
  ],
  className = "",
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header
      className={`font-navbar bg-white lg:w-screen shadow-sm px-4 sm:px-6 relative ${className}`}
    >
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-primary font-bold text-lg sm:text-xl">{logo}</div>

        {/* Additional content (like action buttons) */}
        {children}

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-primary-dark hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button - Hidden on desktop */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <svg
              className={`w-6 h-6 text-primary-dark transition-transform duration-200 ${
                isMobileMenuOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t lg:hidden z-50">
          <div className="px-4 py-2 max-w-7xl mx-auto">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-3 py-3 text-primary-dark hover:text-primary hover:bg-gray-50 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;
