import { PlanetImageKey } from "../assets/images";

export interface Planet {
  id: string;
  name: string;
  mass: number;
  radius: number;
  period: number;
  semi_major_axis: number;
  temperature: number;
  distance_light_year: number | null;
  host_star_mass: number;
  host_star_temperature: number;
  composition?: string;
  atmosphere?: string;
  habitabilityScore?: number; // Added habitability score property
}

export interface PlanetDetails extends Planet {
  description: string;
  funFact: string;
  imageKey: PlanetImageKey;
}

export interface SpaceFact {
  id: number;
  title: string;
  description: string;
  icon: string;
}
