import React, { useState, useEffect, useRef, useMemo } from "react";
import { solarSystemPlanets } from "../lib/api";
import { PlanetDetails } from "../lib/types";
import PlanetCard from "./PlanetCard";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Filter,
  Search,
  Info,
} from "lucide-react";
import { planetImages } from "../assets/images";
import PlanetCompare from "./PlanetCompare";
import Navbar from "./Navbar";

const PlanetExplorer: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetDetails | null>(
    null
  );
  const [showCompare, setShowCompare] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [planets, setPlanets] = useState<PlanetDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "name" | "mass" | "temperature" | "radius"
  >("name");
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");
  const [filterVisible, setFilterVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Function to open comparison modal
  const handleCompare = () => {
    if (selectedPlanet) {
      setShowCompare(true);
      setShowNavbar(false);
    }
  };

  // Function to close comparison modal
  const handleCloseCompare = () => {
    setShowCompare(false);
    setShowNavbar(true);
  };

  // Cache habitability scores for each planet to prevent recalculation on re-renders
  const habitabilityScores = useMemo(() => {
    const scores: Record<string, number> = {};

    const calculateScore = (planet: PlanetDetails) => {
      if (planet.name === "Earth") return 100;

      // Simplified score based on temperature range
      const idealTemp = 288; // Earth's average temperature in K
      const tempDiff = Math.abs(planet.temperature - idealTemp);

      if (tempDiff > 200) return Math.floor(Math.random() * 10) + 1;
      if (tempDiff > 100) return Math.floor(Math.random() * 20) + 10;
      if (tempDiff > 50) return Math.floor(Math.random() * 30) + 20;
      return Math.floor(Math.random() * 40) + 30;
    };

    // Precalculate all scores
    solarSystemPlanets.forEach((planet) => {
      scores[planet.id] = calculateScore(planet);
    });

    return scores;
  }, []);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const planetsWithScores = solarSystemPlanets.map((planet) => ({
        ...planet,
        habitabilityScore: habitabilityScores[planet.id],
      }));

      setPlanets(planetsWithScores);
      setSelectedPlanet(planetsWithScores[2]); // Default to Earth
      setLoading(false);
    }, 1000);

    // Freeze scroll when compare modal is open
    if (showCompare) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto"; // Ensure scroll resets when unmounting
    };
  }, [habitabilityScores, showCompare]); // Add `showCompare` as a dependency

  const handlePlanetSelect = (planet: PlanetDetails) => {
    setSelectedPlanet(planet);

    // Smooth scroll to top of section on mobile
    if (window.innerWidth < 1024) {
      const planetsSection = document.getElementById("planets");
      if (planetsSection) {
        planetsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navigatePlanet = (direction: "prev" | "next") => {
    if (!selectedPlanet) return;
    const currentIndex = planets.findIndex((p) => p.id === selectedPlanet.id);
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? planets.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === planets.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedPlanet(planets[newIndex]);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Filter planets based on search term
  const filteredPlanets = planets.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort planets
  const sortedPlanets = [...filteredPlanets].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "mass") {
      return a.mass - b.mass;
    } else if (sortBy === "temperature") {
      return a.temperature - b.temperature;
    } else {
      return a.radius - b.radius;
    }
  });

  // Toggle filter visibility
  const toggleFilters = () => {
    setFilterVisible(!filterVisible);
  };

  // Reset filters and search
  const resetFilters = () => {
    setSearchTerm("");
    setSortBy("name");
  };

  // Get temperature color similar to PlanetCard
  const getTemperatureColor = (temp: number) => {
    if (temp < 200) return "bg-blue-500";
    if (temp < 300) return "bg-green-500";
    if (temp < 500) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading) {
    return (
      <section
        id="planets"
        className="min-h-screen flex flex-col items-center justify-center text-white py-20"
      >
        <RotateCw className="animate-spin h-12 w-12 text-space-accent mb-4" />
        <p className="text-xl font-display">Loading planetary data...</p>
      </section>
    );
  }

  return (
    <>
      <Navbar showNavbar={showNavbar} /> {/* Conditionally render Navbar */}
      <section id="planets" className="py-20 relative">
        {/* Background effect */}
        <div className="absolute inset-0 dot-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-space-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-space-black to-transparent"></div>

        {/* Random small stars - matching the style from FactsSection */}
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
          {/* Header */}
          <div className="text-center mb-16">
            <div className="pill mx-auto mb-4 backdrop-blur-sm">
              Cosmic Bodies
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Planet Explorer
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore the planets of our solar system and discover their unique
              characteristics.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search planets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-space-accent/50 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFilters}
                  className="pill flex items-center gap-1.5 bg-white/5 hover:bg-white/10"
                >
                  <Filter size={14} />
                  <span>Filters</span>
                </button>
                <button
                  onClick={resetFilters}
                  className="pill flex items-center gap-1.5 bg-white/5 hover:bg-white/10"
                >
                  <RotateCw size={14} />
                  <span>Reset</span>
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`pill px-3 py-1.5 ${
                      viewMode === "grid"
                        ? "bg-space-accent/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("carousel")}
                    className={`pill px-3 py-1.5 ${
                      viewMode === "carousel"
                        ? "bg-space-accent/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    Carousel
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded filters */}
            {filterVisible && (
              <div className="glass-card p-4 mb-6 animate-fade-in">
                <h3 className="text-lg font-display mb-3">Sort by</h3>
                <div className="flex flex-wrap gap-2">
                  {["name", "mass", "temperature", "radius"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSortBy(option as any)}
                      className={`pill px-3 py-1.5 capitalize ${
                        sortBy === option
                          ? "bg-space-accent/30"
                          : "bg-white/5 hover:bg-white/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Selected Planet Details */}
          {selectedPlanet && (
            <div className="glass-card p-6 mb-12 border border-space-accent/10">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Planet Image */}
                <div className="flex-shrink-0 flex items-center justify-center lg:w-1/3">
                  <div className="relative h-64 w-64 mx-auto">
                    <div className="absolute inset-0 rounded-full bg-space-accent/10 animate-pulse-slow"></div>
                    <img
                      src={planetImages[selectedPlanet.imageKey]}
                      alt={selectedPlanet.name}
                      className="h-full w-full object-contain animate-float"
                    />
                  </div>
                </div>

                {/* Planet Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-display font-bold text-white">
                      {selectedPlanet.name}
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigatePlanet("prev")}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                      >
                        <ArrowLeft size={26} />
                      </button>
                      <button
                        onClick={() => navigatePlanet("next")}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
                      >
                        <ArrowRight size={26} />
                      </button>
                    </div>
                  </div>

                  <p className="text-white/80 mb-6">
                    {selectedPlanet.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="glass-card p-3">
                      <div className="text-white/50 text-xs mb-1">Mass</div>
                      <div className="text-white text-lg font-medium">
                        {selectedPlanet.mass} M⊕
                      </div>
                    </div>
                    <div className="glass-card p-3">
                      <div className="text-white/50 text-xs mb-1">Radius</div>
                      <div className="text-white text-lg font-medium">
                        {selectedPlanet.radius} R⊕
                      </div>
                    </div>
                    <div className="glass-card p-3">
                      <div className="text-white/50 text-xs mb-1">
                        Temperature
                      </div>
                      <div className="text-white text-lg font-medium flex items-center">
                        {selectedPlanet.temperature} K
                        <span
                          className={`inline-block h-3 w-3 rounded-full ${getTemperatureColor(
                            selectedPlanet.temperature
                          )} ml-2`}
                        ></span>
                      </div>
                    </div>
                    <div className="glass-card p-3">
                      <div className="text-white/50 text-xs mb-1">
                        Orbital Period
                      </div>
                      <div className="text-white text-lg font-medium">
                        {selectedPlanet.period} days
                      </div>
                    </div>
                  </div>

                  {/* Habitability score */}
                  <div className="glass-card p-4 mb-6">
                    <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
                      <Info size={14} className="text-space-accent" />
                      Habitability Index
                    </h4>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-white/50">Potential for Life</span>
                      <span className="text-white/80">
                        {selectedPlanet.habitabilityScore ||
                          habitabilityScores[selectedPlanet.id]}
                        %
                      </span>
                    </div>
                    <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full"
                        style={{
                          width: `${
                            selectedPlanet.habitabilityScore ||
                            habitabilityScores[selectedPlanet.id]
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="glass-card p-4">
                      <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
                        <Info size={14} className="text-space-accent" />
                        Composition
                      </h4>
                      <p className="text-white/60 text-sm">
                        {selectedPlanet.composition ||
                          "Primarily composed of silicate rocks and metals."}
                      </p>
                    </div>
                    <div className="glass-card p-4">
                      <h4 className="text-sm font-medium text-white/70 mb-2 flex items-center gap-1.5">
                        <Info size={14} className="text-space-accent" />
                        Atmosphere
                      </h4>
                      <p className="text-white/60 text-sm">
                        {selectedPlanet.atmosphere ||
                          "Thin or no atmosphere detected."}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCompare}
                      className="pill bg-space-accent/20 hover:bg-space-accent/30 text-white"
                    >
                      Compare Planets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Planet Comparison Modal */}
          {showCompare && selectedPlanet && (
            <PlanetCompare
              selectedPlanet={selectedPlanet}
              planets={planets}
              onClose={handleCloseCompare}
            />
          )}

          {/* Planets List */}
          <h3 className="text-xl text-white/70 font-display font-semibold mb-6 flex items-center">
            <span className="mr-2">Solar System Planets</span>
            <span className="text-sm bg-white/10 rounded-full px-2 py-0.5 text-white/70">
              {sortedPlanets.length}
            </span>
          </h3>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {sortedPlanets.map((planet) => (
                <PlanetCard
                  key={planet.id}
                  planet={{
                    ...planet,
                    habitabilityScore: habitabilityScores[planet.id],
                  }}
                  onClick={handlePlanetSelect}
                  isActive={selectedPlanet?.id === planet.id}
                />
              ))}
            </div>
          )}

          {/* Carousel View */}
          {viewMode === "carousel" && (
            <div className="relative">
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="w-10 h-10 rounded-full bg-space-darker/80 hover:bg-space-darker flex items-center justify-center"
                >
                  <ArrowLeft size={20} />
                </button>
              </div>
              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              >
                {sortedPlanets.map((planet) => (
                  <div key={planet.id} className="min-w-[350px] snap-start">
                    <PlanetCard
                      planet={{
                        ...planet,
                        habitabilityScore: habitabilityScores[planet.id],
                      }}
                      onClick={handlePlanetSelect}
                      isActive={selectedPlanet?.id === planet.id}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
                <button
                  onClick={() => scrollCarousel("right")}
                  className="w-10 h-10 rounded-full bg-space-darker/80 hover:bg-space-darker flex items-center justify-center"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {sortedPlanets.length === 0 && (
            <div className="glass-card p-12 text-center">
              <p className="text-xl font-display mb-4">No planets found</p>
              <p className="text-white/60 mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={resetFilters}
                className="pill bg-space-accent hover:bg-space-accent/80 flex items-center gap-1.5 mx-auto"
              >
                <RotateCw size={14} />
                <span>Reset Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PlanetExplorer;
