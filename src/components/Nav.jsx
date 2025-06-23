import React, { useState, useEffect } from "react";
import { styles } from "../styles";
import logo from "../assets/aws_voice_logo.png"

const sections = [
  { label: "Home", id: "home", isExternal: false },
  { label: "Missions", id: "missions", isExternal: false },
  { label: "Services", id: "services", isExternal: false },
  { label: "Sign In", id: "/signin", isExternal: true },
];

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = sections.filter((s) => !s.isExternal).map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // section should be at least 50% in view
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    // <header
    //   className={`${styles.paddingX} ${styles.paddingY} font-navbar bg-white shadow-[0_8px_12px_-4px_rgba(0,0,0,0.2)] relative z-50 sticky top-0`}
    // >
    <header
      className={`${styles.paddingX} ${styles.paddingY} font-navbar bg-white shadow-[0_8px_12px_-4px_rgba(0,0,0,0.2)] fixed top-0 left-0 w-full z-50`}
    >
      <nav
        className={`${styles.headerSubText} flex items-center justify-between mx-auto`}
      >
        <div
          className={`text-primary font-bold cursor-pointer flex items-center justify-center gap-2`}
          onClick={() => navigate("/")}
        >
          <div className="flex items-center justify-center">
            <img src={logo} alt="" className="h-10" />
          </div>
          <div className="text-center">SocialSim</div>
        </div>
        <div className="hidden 2xl:flex 2xl:space-x-24 lg:flex lg:space-x-16 xs:flex xs:space-x-12 ">
          {sections.map(({ label, id, isExternal }) => (
            <a
              key={id}
              href={isExternal ? id : `#${id}`}
              onClick={() => {
                if (!isExternal) setIsMobileMenuOpen(false);
              }}
              className={`transition-colors 2xl:text-[30px] lg:text-[22px] md:text-[18px] sm:text-[14px] xs:text-[12px] text-[12px] lg:leading-[32px] cursor-pointer
      ${
        activeSection === id
          ? "text-primary border-b-2 border-primary"
          : "text-black hover:text-primary"
      }`}
            >
              {label}
            </a>
          ))}
        </div>
        <div className="xs:hidden">
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
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t lg:hidden z-50">
            <div className="px-4 py-2 max-w-7xl mx-auto">
              <nav className="flex flex-col space-y-1">
                {sections.map(({ label, id, isExternal }) => (
                  <a
                    key={id}
                    href={isExternal ? id : `#${id}`}
                    onClick={() => {
                      if (!isExternal) setIsMobileMenuOpen(false); // Close mobile menu only on scroll
                    }}
                    className="text-primary-dark hover:text-primary transition-colors 2xl:text-[35px] lg:text-[27px] md:text-[20px] sm:text-[16px] xs:text-[14px] text-[14px] lg:leading-[40px] cursor-pointer"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
