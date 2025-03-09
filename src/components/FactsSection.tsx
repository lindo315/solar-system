import React, { useState } from "react";
import { spaceFacts } from "../lib/api";
import {
  Scale,
  Wind,
  Droplets,
  Diamond,
  Star,
  Music,
  ArrowRight,
  ArrowLeft,
  Share2,
  BookOpen,
} from "lucide-react";

const FactsSection: React.FC = () => {
  const [expandedFact, setExpandedFact] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const factsPerPage = 6;
  const totalPages = Math.ceil(spaceFacts.length / factsPerPage);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "scale":
        return <Scale className="h-8 w-8 text-space-accent" />;
      case "wind":
        return <Wind className="h-8 w-8 text-space-accent" />;
      case "droplets":
        return <Droplets className="h-8 w-8 text-space-accent" />;
      case "diamond":
        return <Diamond className="h-8 w-8 text-space-accent" />;
      case "star":
        return <Star className="h-8 w-8 text-space-accent" />;
      case "music":
        return <Music className="h-8 w-8 text-space-accent" />;
      default:
        return <Star className="h-8 w-8 text-space-accent" />;
    }
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setExpandedFact(null);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setExpandedFact(null);
  };

  const currentFacts = spaceFacts.slice(
    currentPage * factsPerPage,
    (currentPage + 1) * factsPerPage
  );

  const toggleExpandFact = (id: number) => {
    setExpandedFact(expandedFact === id ? null : id);
  };

  return (
    <section id="facts" className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 dot-pattern opacity-30"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-space-black to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-space-black to-transparent"></div>

      {/* Random small stars */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse-slow"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="pill mx-auto mb-4 backdrop-blur-sm">
            Cosmic Knowledge
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Fascinating Space Facts
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            The universe is filled with mind-bending phenomena. Here are some
            fascinating facts about our cosmic neighborhood.
          </p>
          <div className="flex items-center justify-center mt-4 text-white/70 text-sm">
            <BookOpen size={16} className="mr-2" />
            Swipe through our collection or click on any fact to learn more
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentFacts.map((fact) => (
            <div
              key={fact.id}
              className={`glass-card p-6 hover:transform hover:translate-y-[-5px] transition-all duration-300 cursor-pointer ${
                expandedFact === fact.id
                  ? "bg-white/10 border border-space-accent/30"
                  : ""
              }`}
              onClick={() => toggleExpandFact(fact.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="mb-4">{getIcon(fact.icon)}</div>
                {expandedFact === fact.id && (
                  <button className="p-1 rounded-full hover:bg-white/10">
                    <Share2 size={16} className="text-white/60" />
                  </button>
                )}
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3">
                {fact.title}
              </h3>
              <p className="text-white/70">{fact.description}</p>

              {expandedFact === fact.id && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                  <p className="text-white/80 italic">
                    "
                    {fact.extraDetail ||
                      "The more we learn about space, the more we realize how much is still unknown. This cosmic mystery continues to drive our exploration and curiosity."}
                    "
                  </p>
                  <div className="mt-4 flex justify-end">
                    <div className="pill text-xs bg-space-accent/20">
                      Source: NASA
                    </div>
                  </div>
                </div>
              )}

              {expandedFact !== fact.id && (
                <button className="mt-3 text-space-accent flex items-center text-sm hover:underline">
                  Read more
                  <ArrowRight size={14} className="ml-1" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center items-center gap-4">
          <button
            onClick={prevPage}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Previous facts"
          >
            <ArrowLeft size={20} className="text-white/70" />
          </button>

          <div className="text-white/70">
            Page {currentPage + 1} of {totalPages}
          </div>

          <button
            onClick={nextPage}
            className="p-3 rounded-full glass hover:bg-white/10 transition-colors flex items-center justify-center"
            aria-label="Next facts"
          >
            <ArrowRight size={20} className="text-white/70" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FactsSection;
