import React, { useState, useEffect, useRef } from "react";
import {
  X,
  ArrowLeftRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Info,
} from "lucide-react";
import { PlanetDetails } from "../lib/types";
import { planetImages } from "../assets/images";

interface PlanetCompareProps {
  selectedPlanet: PlanetDetails | null;
  planets: PlanetDetails[];
  onClose: () => void;
}

const PlanetCompare: React.FC<PlanetCompareProps> = ({
  selectedPlanet,
  planets,
  onClose,
}) => {
  const [comparePlanet, setComparePlanet] = useState<PlanetDetails | null>(
    null
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "charts">(
    "overview"
  );
  const [isVisible, setIsVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // Set Earth as default comparison if the selected planet is not Earth
  useEffect(() => {
    if (selectedPlanet) {
      const defaultCompare = planets.find((p) =>
        selectedPlanet.name === "Earth" ? p.name === "Mars" : p.name === "Earth"
      );
      setComparePlanet(defaultCompare || null);
    }
  }, [selectedPlanet, planets]);

  // Animate entrance
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle close with animation
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for animation to complete
  };

  // Get temperature color (reused from PlanetCard)
  const getTemperatureColor = (temp: number) => {
    if (temp < 200) return "bg-blue-500";
    if (temp < 300) return "bg-green-500";
    if (temp < 500) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate difference percentage
  const calculateDifference = (value1: number, value2: number) => {
    if (value2 === 0) return 100; // Avoid division by zero
    return Math.round(((value1 - value2) / value2) * 100);
  };

  // Render comparison detail row
  const renderComparisonRow = (
    label: string,
    value1: number | string,
    value2: number | string,
    unit: string = "",
    showPercentage: boolean = true
  ) => {
    let difference: number | null = null;
    let percentageDisplay = "";

    if (
      typeof value1 === "number" &&
      typeof value2 === "number" &&
      showPercentage
    ) {
      difference = calculateDifference(value1, value2);
      percentageDisplay = `${difference > 0 ? "+" : ""}${difference}%`;
    }

    return (
      <div className="grid grid-cols-12 gap-2 py-3 border-b border-white/10 items-center">
        <div className="col-span-4 text-white/60 text-sm">{label}</div>
        <div className="col-span-3 text-white font-medium text-right">
          {value1} {unit}
        </div>
        <div className="col-span-2 flex justify-center">
          {difference !== null && (
            <span
              className={`text-xs pill ${
                difference > 0 ? "bg-red-500/30" : "bg-green-500/30"
              }`}
            >
              {percentageDisplay}
            </span>
          )}
        </div>
        <div className="col-span-3 text-white font-medium text-right">
          {value2} {unit}
        </div>
      </div>
    );
  };

  if (!selectedPlanet || !comparePlanet) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`glass-card p-0 w-full max-w-3xl max-h-[90vh] overflow-hidden transition-transform duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-16"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-space-darker/70 p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="text-space-accent" size={18} />
            <h2 className="text-xl font-display font-bold text-white">
              Planet Comparison
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Planets */}
        <div className="grid grid-cols-2 p-6 gap-4">
          {/* Left Planet (Selected) */}
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 mb-4">
              <div className="absolute inset-0 rounded-full bg-space-accent/10 animate-pulse-slow"></div>
              <img
                src={planetImages[selectedPlanet.imageKey]}
                alt={selectedPlanet.name}
                className="h-full w-full object-contain animate-float-slow"
              />
            </div>
            <h3 className="text-2xl font-display font-semibold text-white mb-2">
              {selectedPlanet.name}
            </h3>
          </div>

          {/* Right Planet (Comparison) */}
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 mb-4">
              <div className="absolute inset-0 rounded-full bg-space-blue/20 animate-pulse-slow"></div>
              <img
                src={planetImages[comparePlanet.imageKey]}
                alt={comparePlanet.name}
                className="h-full w-full object-contain animate-float-slow"
              />
            </div>

            {/* Planet Selector */}
            <div ref={selectRef} className="relative">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="text-2xl font-display font-semibold text-white mb-2 flex items-center gap-1 hover:text-space-accent transition-colors"
              >
                {comparePlanet.name}
                {isSelectOpen ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {/* Dropdown */}
              {isSelectOpen && (
                <div className="absolute z-10 right-0 mt-2 w-48 glass-card backdrop-blur-lg divide-y divide-white/10 shadow-xl border border-white/20 animate-fade-in">
                  {planets
                    .filter((p) => p.id !== selectedPlanet.id)
                    .map((planet) => (
                      <button
                        key={planet.id}
                        className="block w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors"
                        onClick={() => {
                          setComparePlanet(planet);
                          setIsSelectOpen(false);
                        }}
                      >
                        {planet.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-white/10">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-space-accent text-white"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "details"
                  ? "border-space-accent text-white"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
              onClick={() => setActiveTab("details")}
            >
              Detailed Comparison
            </button>
            <button
              className={`px-4 py-2 border-b-2 transition-colors ${
                activeTab === "charts"
                  ? "border-space-accent text-white"
                  : "border-transparent text-white/50 hover:text-white/80"
              }`}
              onClick={() => setActiveTab("charts")}
            >
              Charts
            </button>
          </div>
        </div>

        {/* Content Area - Scrollable */}
        <div className="p-6 max-h-[calc(90vh-350px)] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6 animate-fade-in">
              {/* Description Comparison */}
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-card p-4">
                  <p className="text-white/80 text-sm">
                    {selectedPlanet.description}
                  </p>
                </div>
                <div className="glass-card p-4">
                  <p className="text-white/80 text-sm">
                    {comparePlanet.description}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4">
                  Key Parameters
                </h4>
                <div className="space-y-4">
                  {/* Headers */}
                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-white/20">
                    <div className="col-span-4"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {selectedPlanet.name}
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {comparePlanet.name}
                    </div>
                  </div>

                  {/* Mass */}
                  {renderComparisonRow(
                    "Mass",
                    selectedPlanet.mass,
                    comparePlanet.mass,
                    "M⊕"
                  )}

                  {/* Radius */}
                  {renderComparisonRow(
                    "Radius",
                    selectedPlanet.radius,
                    comparePlanet.radius,
                    "R⊕"
                  )}

                  {/* Temperature */}
                  {renderComparisonRow(
                    "Temperature",
                    selectedPlanet.temperature,
                    comparePlanet.temperature,
                    "K"
                  )}

                  {/* Orbital Period */}
                  {renderComparisonRow(
                    "Orbital Period",
                    selectedPlanet.period,
                    comparePlanet.period,
                    "days"
                  )}

                  {/* Habitability Score */}
                  {renderComparisonRow(
                    "Habitability Score",
                    selectedPlanet.habitabilityScore || 0,
                    comparePlanet.habitabilityScore || 0,
                    "%"
                  )}
                </div>
              </div>

              {/* Habitability Comparison */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                  <Info size={16} className="text-space-accent" />
                  Habitability Comparison
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-white/70">
                        {selectedPlanet.name}
                      </span>
                      <span className="text-white font-medium">
                        {selectedPlanet.habitabilityScore || 0}%
                      </span>
                    </div>
                    <div className="bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${selectedPlanet.habitabilityScore || 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-white/70">
                        {comparePlanet.name}
                      </span>
                      <span className="text-white font-medium">
                        {comparePlanet.habitabilityScore || 0}%
                      </span>
                    </div>
                    <div className="bg-white/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${comparePlanet.habitabilityScore || 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detailed Comparison Tab */}
          {activeTab === "details" && (
            <div className="space-y-6 animate-fade-in">
              {/* Physical Properties */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4">
                  Physical Properties
                </h4>
                <div className="space-y-2">
                  {/* Headers */}
                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-white/20">
                    <div className="col-span-4"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {selectedPlanet.name}
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {comparePlanet.name}
                    </div>
                  </div>

                  {renderComparisonRow(
                    "Mass",
                    selectedPlanet.mass,
                    comparePlanet.mass,
                    "M⊕"
                  )}
                  {renderComparisonRow(
                    "Radius",
                    selectedPlanet.radius,
                    comparePlanet.radius,
                    "R⊕"
                  )}
                  {renderComparisonRow(
                    "Volume",
                    (
                      (4 / 3) *
                      Math.PI *
                      Math.pow(selectedPlanet.radius, 3)
                    ).toFixed(1),
                    (
                      (4 / 3) *
                      Math.PI *
                      Math.pow(comparePlanet.radius, 3)
                    ).toFixed(1),
                    "R⊕³"
                  )}
                  {renderComparisonRow(
                    "Surface Gravity",
                    (
                      selectedPlanet.mass / Math.pow(selectedPlanet.radius, 2)
                    ).toFixed(2),
                    (
                      comparePlanet.mass / Math.pow(comparePlanet.radius, 2)
                    ).toFixed(2),
                    "g"
                  )}
                  {renderComparisonRow(
                    "Density",
                    (
                      selectedPlanet.mass /
                      ((4 / 3) * Math.PI * Math.pow(selectedPlanet.radius, 3))
                    ).toFixed(2),
                    (
                      comparePlanet.mass /
                      ((4 / 3) * Math.PI * Math.pow(comparePlanet.radius, 3))
                    ).toFixed(2),
                    "g/cm³"
                  )}
                </div>
              </div>

              {/* Orbital Properties */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4">
                  Orbital Properties
                </h4>
                <div className="space-y-2">
                  {/* Headers */}
                  <div className="grid grid-cols-12 gap-2 pb-2 border-b border-white/20">
                    <div className="col-span-4"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {selectedPlanet.name}
                    </div>
                    <div className="col-span-2"></div>
                    <div className="col-span-3 text-white/70 text-right font-medium">
                      {comparePlanet.name}
                    </div>
                  </div>

                  {renderComparisonRow(
                    "Orbital Period",
                    selectedPlanet.period,
                    comparePlanet.period,
                    "days"
                  )}
                  {renderComparisonRow(
                    "Orbital Velocity",
                    (
                      (2 *
                        Math.PI *
                        (selectedPlanet.id === "earth"
                          ? 1
                          : selectedPlanet.id === "mercury"
                          ? 0.4
                          : selectedPlanet.id === "venus"
                          ? 0.7
                          : selectedPlanet.id === "mars"
                          ? 1.5
                          : selectedPlanet.id === "jupiter"
                          ? 5.2
                          : selectedPlanet.id === "saturn"
                          ? 9.5
                          : selectedPlanet.id === "uranus"
                          ? 19.8
                          : 30.1) *
                        149.6) /
                      (selectedPlanet.period * 24 * 60 * 60)
                    ).toFixed(1),
                    (
                      (2 *
                        Math.PI *
                        (comparePlanet.id === "earth"
                          ? 1
                          : comparePlanet.id === "mercury"
                          ? 0.4
                          : comparePlanet.id === "venus"
                          ? 0.7
                          : comparePlanet.id === "mars"
                          ? 1.5
                          : comparePlanet.id === "jupiter"
                          ? 5.2
                          : comparePlanet.id === "saturn"
                          ? 9.5
                          : comparePlanet.id === "uranus"
                          ? 19.8
                          : 30.1) *
                        149.6) /
                      (comparePlanet.period * 24 * 60 * 60)
                    ).toFixed(1),
                    "km/s"
                  )}
                  {renderComparisonRow(
                    "Solar Irradiance",
                    (
                      (1 /
                        Math.pow(
                          selectedPlanet.id === "earth"
                            ? 1
                            : selectedPlanet.id === "mercury"
                            ? 0.4
                            : selectedPlanet.id === "venus"
                            ? 0.7
                            : selectedPlanet.id === "mars"
                            ? 1.5
                            : selectedPlanet.id === "jupiter"
                            ? 5.2
                            : selectedPlanet.id === "saturn"
                            ? 9.5
                            : selectedPlanet.id === "uranus"
                            ? 19.8
                            : 30.1,
                          2
                        )) *
                      100
                    ).toFixed(1),
                    (
                      (1 /
                        Math.pow(
                          comparePlanet.id === "earth"
                            ? 1
                            : comparePlanet.id === "mercury"
                            ? 0.4
                            : comparePlanet.id === "venus"
                            ? 0.7
                            : comparePlanet.id === "mars"
                            ? 1.5
                            : comparePlanet.id === "jupiter"
                            ? 5.2
                            : comparePlanet.id === "saturn"
                            ? 9.5
                            : comparePlanet.id === "uranus"
                            ? 19.8
                            : 30.1,
                          2
                        )) *
                      100
                    ).toFixed(1),
                    "%"
                  )}
                </div>
              </div>

              {/* Atmospheric Properties */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4">
                  Atmosphere & Climate
                </h4>

                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="text-white/70 text-sm mb-2">
                      {selectedPlanet.name}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${getTemperatureColor(
                        selectedPlanet.temperature
                      )} bg-opacity-20`}
                    >
                      <div className="text-sm text-white">
                        {selectedPlanet.atmosphere ||
                          "Little to no atmosphere detected"}
                      </div>
                      <div className="flex items-center mt-2">
                        <div
                          className={`h-4 w-4 rounded-full ${getTemperatureColor(
                            selectedPlanet.temperature
                          )} mr-2`}
                        ></div>
                        <span className="text-white text-sm">
                          {selectedPlanet.temperature} K
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-white/70 text-sm mb-2">
                      {comparePlanet.name}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${getTemperatureColor(
                        comparePlanet.temperature
                      )} bg-opacity-20`}
                    >
                      <div className="text-sm text-white">
                        {comparePlanet.atmosphere ||
                          "Little to no atmosphere detected"}
                      </div>
                      <div className="flex items-center mt-2">
                        <div
                          className={`h-4 w-4 rounded-full ${getTemperatureColor(
                            comparePlanet.temperature
                          )} mr-2`}
                        ></div>
                        <span className="text-white text-sm">
                          {comparePlanet.temperature} K
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Composition */}
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-4">
                  Composition
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-white/70 text-sm mb-2">
                      {selectedPlanet.name}
                    </div>
                    <p className="text-white/80 text-sm">
                      {selectedPlanet.composition ||
                        "Primarily composed of silicate rocks and metals."}
                    </p>
                  </div>
                  <div>
                    <div className="text-white/70 text-sm mb-2">
                      {comparePlanet.name}
                    </div>
                    <p className="text-white/80 text-sm">
                      {comparePlanet.composition ||
                        "Primarily composed of silicate rocks and metals."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Charts Tab */}
          {activeTab === "charts" && (
            <div className="space-y-6 animate-fade-in">
              <div className="glass-card p-4">
                <h4 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                  <BarChart3 size={18} className="text-space-accent" />
                  Comparative Analysis
                </h4>

                {/* Basic bar chart for comparison */}
                <div className="space-y-8">
                  {/* Mass comparison */}
                  <div>
                    <h5 className="text-white/70 text-sm mb-3">
                      Mass (Earth = 1)
                    </h5>
                    <div className="relative h-8 mb-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-white/20"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                      {/* Scale markers */}
                      {[0, 0.25, 0.5, 0.75, 1].map((value) => (
                        <div
                          key={value}
                          className="absolute bottom-0 h-2 w-px bg-white/40"
                          style={{ left: `${value * 100}%` }}
                        >
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-white/40">
                            {value *
                              Math.max(selectedPlanet.mass, comparePlanet.mass)}
                          </div>
                        </div>
                      ))}

                      {/* Selected planet bar */}
                      <div
                        className="absolute h-3 bg-space-accent rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (selectedPlanet.mass /
                              Math.max(
                                selectedPlanet.mass,
                                comparePlanet.mass
                              )) *
                            100
                          }%`,
                          top: 0,
                        }}
                      >
                        <div className="absolute -right-1 -top-6 text-xs text-space-accent whitespace-nowrap">
                          {selectedPlanet.name}: {selectedPlanet.mass} M⊕
                        </div>
                      </div>

                      {/* Compare planet bar */}
                      <div
                        className="absolute h-3 bg-blue-400 rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (comparePlanet.mass /
                              Math.max(
                                selectedPlanet.mass,
                                comparePlanet.mass
                              )) *
                            100
                          }%`,
                          bottom: 0,
                        }}
                      >
                        <div className="absolute -right-1 -bottom-6 text-xs text-blue-400 whitespace-nowrap">
                          {comparePlanet.name}: {comparePlanet.mass} M⊕
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Radius comparison */}
                  <div>
                    <h5 className="text-white/70 text-sm mb-3">
                      Radius (Earth = 1)
                    </h5>
                    <div className="relative h-8 mb-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-white/20"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                      {/* Scale markers */}
                      {[0, 0.25, 0.5, 0.75, 1].map((value) => (
                        <div
                          key={value}
                          className="absolute bottom-0 h-2 w-px bg-white/40"
                          style={{ left: `${value * 100}%` }}
                        >
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-white/40">
                            {value *
                              Math.max(
                                selectedPlanet.radius,
                                comparePlanet.radius
                              )}
                          </div>
                        </div>
                      ))}

                      {/* Selected planet bar */}
                      <div
                        className="absolute h-3 bg-space-accent rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (selectedPlanet.radius /
                              Math.max(
                                selectedPlanet.radius,
                                comparePlanet.radius
                              )) *
                            100
                          }%`,
                          top: 0,
                        }}
                      >
                        <div className="absolute -right-1 -top-6 text-xs text-space-accent whitespace-nowrap">
                          {selectedPlanet.name}: {selectedPlanet.radius} R⊕
                        </div>
                      </div>

                      {/* Compare planet bar */}
                      <div
                        className="absolute h-3 bg-blue-400 rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (comparePlanet.radius /
                              Math.max(
                                selectedPlanet.radius,
                                comparePlanet.radius
                              )) *
                            100
                          }%`,
                          bottom: 0,
                        }}
                      >
                        <div className="absolute -right-1 -bottom-6 text-xs text-blue-400 whitespace-nowrap">
                          {comparePlanet.name}: {comparePlanet.radius} R⊕
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Temperature comparison */}
                  <div>
                    <h5 className="text-white/70 text-sm mb-3">
                      Temperature (K)
                    </h5>
                    <div className="relative h-8 mb-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-white/20"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                      {/* Scale markers */}
                      {[0, 0.25, 0.5, 0.75, 1].map((value) => (
                        <div
                          key={value}
                          className="absolute bottom-0 h-2 w-px bg-white/40"
                          style={{ left: `${value * 100}%` }}
                        >
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-white/40">
                            {Math.round(
                              value *
                                Math.max(
                                  selectedPlanet.temperature,
                                  comparePlanet.temperature
                                )
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Selected planet bar */}
                      <div
                        className="absolute h-3 rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (selectedPlanet.temperature /
                              Math.max(
                                selectedPlanet.temperature,
                                comparePlanet.temperature
                              )) *
                            100
                          }%`,
                          top: 0,
                          background: `linear-gradient(90deg, ${getTemperatureColor(
                            selectedPlanet.temperature
                          ).replace("bg-", "rgb(")} 0%, ${getTemperatureColor(
                            selectedPlanet.temperature
                          ).replace("bg-", "rgb(")} 100%)`,
                        }}
                      >
                        <div
                          className="absolute -right-1 -top-6 text-xs whitespace-nowrap"
                          style={{
                            color: getTemperatureColor(
                              selectedPlanet.temperature
                            ).replace("bg-", "rgb("),
                          }}
                        >
                          {selectedPlanet.name}: {selectedPlanet.temperature} K
                        </div>
                      </div>

                      {/* Compare planet bar */}
                      <div
                        className="absolute h-3 rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (comparePlanet.temperature /
                              Math.max(
                                selectedPlanet.temperature,
                                comparePlanet.temperature
                              )) *
                            100
                          }%`,
                          bottom: 0,
                          background: `linear-gradient(90deg, ${getTemperatureColor(
                            comparePlanet.temperature
                          ).replace("bg-", "rgb(")} 0%, ${getTemperatureColor(
                            comparePlanet.temperature
                          ).replace("bg-", "rgb(")} 100%)`,
                        }}
                      >
                        <div
                          className="absolute -right-1 -bottom-6 text-xs whitespace-nowrap"
                          style={{
                            color: getTemperatureColor(
                              comparePlanet.temperature
                            ).replace("bg-", "rgb("),
                          }}
                        >
                          {comparePlanet.name}: {comparePlanet.temperature} K
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Orbital Period comparison */}
                  <div>
                    <h5 className="text-white/70 text-sm mb-3">
                      Orbital Period (days)
                    </h5>
                    <div className="relative h-8 mb-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-white/20"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                      {/* Scale markers */}
                      {[0, 0.25, 0.5, 0.75, 1].map((value) => (
                        <div
                          key={value}
                          className="absolute bottom-0 h-2 w-px bg-white/40"
                          style={{ left: `${value * 100}%` }}
                        >
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-white/40">
                            {Math.round(
                              value *
                                Math.max(
                                  selectedPlanet.period,
                                  comparePlanet.period
                                )
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Selected planet bar */}
                      <div
                        className="absolute h-3 bg-space-accent rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (selectedPlanet.period /
                              Math.max(
                                selectedPlanet.period,
                                comparePlanet.period
                              )) *
                            100
                          }%`,
                          top: 0,
                        }}
                      >
                        <div className="absolute -right-1 -top-6 text-xs text-space-accent whitespace-nowrap">
                          {selectedPlanet.name}: {selectedPlanet.period} days
                        </div>
                      </div>

                      {/* Compare planet bar */}
                      <div
                        className="absolute h-3 bg-blue-400 rounded-r transition-all duration-1000"
                        style={{
                          width: `${
                            (comparePlanet.period /
                              Math.max(
                                selectedPlanet.period,
                                comparePlanet.period
                              )) *
                            100
                          }%`,
                          bottom: 0,
                        }}
                      >
                        <div className="absolute -right-1 -bottom-6 text-xs text-blue-400 whitespace-nowrap">
                          {comparePlanet.name}: {comparePlanet.period} days
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Habitability score comparison */}
                  <div>
                    <h5 className="text-white/70 text-sm mb-3">
                      Habitability Score (%)
                    </h5>
                    <div className="relative h-8 mb-6">
                      <div className="absolute left-0 top-0 h-full w-px bg-white/20"></div>
                      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>

                      {/* Scale markers */}
                      {[0, 25, 50, 75, 100].map((value) => (
                        <div
                          key={value}
                          className="absolute bottom-0 h-2 w-px bg-white/40"
                          style={{ left: `${value}%` }}
                        >
                          <div className="absolute -bottom-6 transform -translate-x-1/2 text-xs text-white/40">
                            {value}
                          </div>
                        </div>
                      ))}

                      {/* Selected planet bar */}
                      <div
                        className="absolute h-3 rounded-r transition-all duration-1000"
                        style={{
                          width: `${selectedPlanet.habitabilityScore || 0}%`,
                          top: 0,
                          background:
                            "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(234,179,8,1) 50%, rgba(34,197,94,1) 100%)",
                        }}
                      >
                        <div className="absolute -right-1 -top-6 text-xs text-green-400 whitespace-nowrap">
                          {selectedPlanet.name}:{" "}
                          {selectedPlanet.habitabilityScore || 0}%
                        </div>
                      </div>

                      {/* Compare planet bar */}
                      <div
                        className="absolute h-3 rounded-r transition-all duration-1000"
                        style={{
                          width: `${comparePlanet.habitabilityScore || 0}%`,
                          bottom: 0,
                          background:
                            "linear-gradient(90deg, rgba(239,68,68,1) 0%, rgba(234,179,8,1) 50%, rgba(34,197,94,1) 100%)",
                        }}
                      >
                        <div className="absolute -right-1 -bottom-6 text-xs text-green-400 whitespace-nowrap">
                          {comparePlanet.name}:{" "}
                          {comparePlanet.habitabilityScore || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Size Comparison */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <h5 className="text-white/70 text-sm mb-6">
                    Visual Size Comparison
                  </h5>
                  <div className="flex items-center justify-center h-40 relative">
                    {/* Scaled planet representations */}
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {/* Selected planet */}
                      <div
                        className="absolute rounded-full border border-white/20 bg-space-accent/20 transition-all duration-1000"
                        style={{
                          width: `${Math.max(
                            selectedPlanet.radius * 20,
                            20
                          )}px`,
                          height: `${Math.max(
                            selectedPlanet.radius * 20,
                            20
                          )}px`,
                          left: `-${Math.max(
                            selectedPlanet.radius * 10,
                            10
                          )}px`,
                          top: `-${Math.max(selectedPlanet.radius * 10, 10)}px`,
                        }}
                      />
                      <div
                        className="absolute text-xs text-space-accent whitespace-nowrap"
                        style={{
                          left: `-${Math.max(
                            selectedPlanet.radius * 10,
                            10
                          )}px`,
                          top: `${Math.max(selectedPlanet.radius * 12, 12)}px`,
                          transform: "translateX(-30%)",
                        }}
                      >
                        {selectedPlanet.name}
                      </div>

                      {/* Compare planet */}
                      <div
                        className="absolute rounded-full border border-white/20 bg-blue-400/20 transition-all duration-1000"
                        style={{
                          width: `${Math.max(comparePlanet.radius * 20, 20)}px`,
                          height: `${Math.max(
                            comparePlanet.radius * 20,
                            20
                          )}px`,
                          left: `${Math.max(comparePlanet.radius * 10, 10)}px`,
                          top: `-${Math.max(comparePlanet.radius * 10, 10)}px`,
                        }}
                      />
                      <div
                        className="absolute text-xs text-blue-400 whitespace-nowrap"
                        style={{
                          left: `${Math.max(comparePlanet.radius * 10, 10)}px`,
                          top: `${Math.max(comparePlanet.radius * 12, 12)}px`,
                          transform: "translateX(30%)",
                        }}
                      >
                        {comparePlanet.name}
                      </div>
                    </div>

                    {/* Scale line */}
                    <div className="absolute bottom-0 left-0 w-full h-px bg-white/20"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetCompare;
