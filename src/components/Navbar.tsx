import React, { useState, useEffect } from "react";
import { Menu, X, Star, Info, User } from "lucide-react";

const Navbar: React.FC<{ showNavbar: boolean }> = ({ showNavbar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Detect which section is currently in view
      const sections = ["hero", "planets", "facts", "creator"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showNavbar) return null; // Hide Navbar if showNavbar is false

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass pt-4 border-b border-white/5 backdrop-blur-md"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-space-blue rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <div className="h-6 w-6 bg-space-black rounded-full flex items-center justify-center">
                <Star className="h-3 w-3 text-space-accent" />
              </div>
            </div>
            <span className="text-xl font-display font-medium text-white group-hover:text-space-accent transition-colors">
              Celestial
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#hero"
              className={`text-white/80 hover:text-white transition-colors relative ${
                currentSection === "hero" ? "font-medium text-white" : ""
              }`}
            >
              Home
              {currentSection === "hero" && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-space-accent rounded-full"></span>
              )}
            </a>
            <a
              href="#planets"
              className={`text-white/80 hover:text-white transition-colors relative ${
                currentSection === "planets" ? "font-medium text-white" : ""
              }`}
            >
              Planets
              {currentSection === "planets" && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-space-accent rounded-full"></span>
              )}
            </a>
            <a
              href="#facts"
              className={`text-white/80 hover:text-white transition-colors relative ${
                currentSection === "facts" ? "font-medium text-white" : ""
              }`}
            >
              Space Facts
              {currentSection === "facts" && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-space-accent rounded-full"></span>
              )}
            </a>
            <a
              href="#creator"
              className={`text-white/80 hover:text-white transition-colors relative ${
                currentSection === "creator" ? "font-medium text-white" : ""
              }`}
            >
              <User size={18} />
              {currentSection === "creator" && (
                <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-space-accent rounded-full"></span>
              )}
            </a>
            <a href="#" className="btn-primary group flex items-center gap-2">
              Explore More
              <Info
                size={16}
                className="transition-transform group-hover:rotate-12"
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card glass mt-4 border-b border-white/5 backdrop-blur-md top-full left-0 right-0 animate-fade-in border-b border-white/10">
          <div className="flex flex-col py-4 px-6 space-y-4">
            <a
              href="#hero"
              className={`text-white/80 hover:text-white py-2 transition-colors flex items-center gap-2 ${
                currentSection === "hero" ? "text-white font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`w-1 h-5 rounded-full ${
                  currentSection === "hero"
                    ? "bg-space-accent"
                    : "bg-transparent"
                }`}
              ></div>
              Home
            </a>
            <a
              href="#planets"
              className={`text-white/80 hover:text-white py-2 transition-colors flex items-center gap-2 ${
                currentSection === "planets" ? "text-white font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`w-1 h-5 rounded-full ${
                  currentSection === "planets"
                    ? "bg-space-accent"
                    : "bg-transparent"
                }`}
              ></div>
              Planets
            </a>
            <a
              href="#facts"
              className={`text-white/80 hover:text-white py-2 transition-colors flex items-center gap-2 ${
                currentSection === "facts" ? "text-white font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`w-1 h-5 rounded-full ${
                  currentSection === "facts"
                    ? "bg-space-accent"
                    : "bg-transparent"
                }`}
              ></div>
              Space Facts
            </a>
            <a
              href="#creator"
              className={`text-white/80 hover:text-white py-2 transition-colors flex items-center gap-2 ${
                currentSection === "creator" ? "text-white font-medium" : ""
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <div
                className={`w-1 h-5 rounded-full ${
                  currentSection === "creator"
                    ? "bg-space-accent"
                    : "bg-transparent"
                }`}
              ></div>
              About Creator
            </a>
            <a
              href="#"
              className="btn-primary w-full text-center flex items-center justify-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore More
              <Info size={16} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
