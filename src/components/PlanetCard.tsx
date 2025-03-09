import React from "react";
import { Info, Star, ExternalLink } from "lucide-react";
import { PlanetDetails } from "../lib/types";
import { planetImages } from "../assets/images";

// Extend PlanetDetails to include habitabilityScore
interface PlanetWithScore extends PlanetDetails {
  habitabilityScore?: number;
}

interface PlanetCardProps {
  planet: PlanetWithScore;
  onClick: (planet: PlanetWithScore) => void;
  isActive: boolean;
}

const PlanetCard: React.FC<PlanetCardProps> = ({
  planet,
  onClick,
  isActive,
}) => {
  // Get color based on temperature (colder = blue, hotter = red)
  const getTemperatureColor = (temp: number) => {
    if (temp < 200) return "bg-blue-500";
    if (temp < 300) return "bg-green-500";
    if (temp < 500) return "bg-yellow-500";
    return "bg-red-500";
  };

  const temperatureColor = getTemperatureColor(planet.temperature);

  // Use the pre-calculated habitability score
  const habitabilityScore = planet.habitabilityScore || 0;

  return (
    <div
      className={`glass-card p-6 cursor-pointer transition-all duration-500 group ${
        isActive
          ? "bg-white/10 scale-105 shadow-xl border border-space-accent/30"
          : "hover:scale-102 hover:border hover:border-white/20"
      }`}
      onClick={() => onClick(planet)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-display font-semibold text-white group-hover:text-space-accent transition-colors">
          {planet.name}
        </h3>
        <div
          className={`pill flex items-center gap-1.5 ${
            isActive ? "bg-space-accent/30" : ""
          }`}
        >
          <Info size={12} />
          <span>Details</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
          <div
            className={`absolute inset-0 rounded-full ${
              isActive ? "bg-space-accent/10" : "bg-space-blue/20"
            } animate-pulse-slow`}
          />
          <img
            src={planetImages[planet.imageKey]}
            alt={planet.name}
            className="h-full w-full object-contain animate-float"
            onError={(e) => console.error("Image failed to load:", e)}
          />
          {isActive && (
            <div className="absolute -top-2 -right-2">
              <Star className="h-4 w-4 text-space-accent animate-pulse" />
            </div>
          )}
        </div>
        <div>
          <p className="text-white/70 text-sm mb-2 line-clamp-2">
            {planet.description}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <div className="text-xs text-white/50">
              Mass:{" "}
              <span className="text-white/80 font-medium">
                {planet.mass} M⊕
              </span>
            </div>
            <div className="text-xs text-white/50">
              Radius:{" "}
              <span className="text-white/80 font-medium">
                {planet.radius} R⊕
              </span>
            </div>
            <div className="text-xs text-white/50 flex items-center gap-1">
              Temp:{" "}
              <span className="text-white/80 font-medium flex items-center">
                {planet.temperature} K
                <span
                  className={`inline-block h-2 w-2 rounded-full ${temperatureColor} ml-1`}
                ></span>
              </span>
            </div>
            <div className="text-xs text-white/50">
              Period:{" "}
              <span className="text-white/80 font-medium">
                {planet.period} days
              </span>
            </div>
          </div>

          {/* Habitability meter - now uses consistent pre-calculated score */}
          <div className="mt-3 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-white/50">Habitability Index</span>
              <span className="text-white/80">{habitabilityScore}%</span>
            </div>
            <div className="bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full rounded-full"
                style={{ width: `${habitabilityScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-1 text-white/50 hover:text-white/80 text-xs transition-colors">
          More info <ExternalLink size={10} />
        </button>
      </div>
    </div>
  );
};

export default PlanetCard;
