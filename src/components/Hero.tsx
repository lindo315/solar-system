import React from "react";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-20"
    >
      {/* Background stars and effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Larger stars */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i + "lg"}
            className="absolute rounded-full bg-space-accent animate-pulse-slow"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Nebula effect */}
        <div className="absolute -top-[30%] -right-[20%] h-[600px] w-[600px] rounded-full bg-space-purple/20 blur-[100px]" />
        <div className="absolute top-[60%] -left-[10%] h-[400px] w-[400px] rounded-full bg-space-blue/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="pill mb-6 animate-fade-in">Explore the Cosmos</div>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Journey Through Our{" "}
            <span className="text-space-accent">Universe</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Explore the wonders of our solar system and beyond. Discover
            fascinating facts about planets, stars, and cosmic phenomena.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <button
              className="btn-primary"
              onClick={() => scrollToSection("planets")}
            >
              Explore Planets
            </button>
            <button
              className="px-6 py-3 border border-white/20 text-white rounded-md font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/30 active:scale-95"
              onClick={() => scrollToSection("facts")}
            >
              Discover Facts
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown
          className="text-white/50"
          size={32}
          onClick={() => scrollToSection("planets")}
        />
      </div>
    </section>
  );
};

export default Hero;
