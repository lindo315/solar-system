import mercury from "./mercury.png";
import venus from "./venus.png";
import earth from "./earth.png";
import mars from "./mars.png";
import jupiter from "./jupiter.png";
import saturn from "./saturn.png";
import uranus from "./uranus.png";
import neptune from "./neptune.png";

export const planetImages = {
  mercury,
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
} as const;

export type PlanetImageKey = keyof typeof planetImages;
