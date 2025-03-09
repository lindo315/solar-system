import { Planet, PlanetDetails } from "./types";

const API_KEY = "pmnLjaoybB3z+SwkuIdDMA==Knw76K1eIZrGXKWW";
const API_URL = "https://api.api-ninjas.com/v1/planets";

export async function fetchPlanets(): Promise<Planet[]> {
  try {
    const response = await fetch(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch planets");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching planets:", error);
    return [];
  }
}

// Solar system planets with additional data
export const solarSystemPlanets: PlanetDetails[] = [
  {
    id: "mercury",
    name: "Mercury",
    mass: 0.055,
    radius: 0.383,
    period: 87.97,
    semi_major_axis: 0.387,
    temperature: 440,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description: "The smallest and innermost planet in the Solar System.",
    funFact:
      "Mercury has no atmosphere, which means it has no weather and no sound can travel there.",
    imageKey: "mercury",
  },
  {
    id: "venus",
    name: "Venus",
    mass: 0.815,
    radius: 0.949,
    period: 224.7,
    semi_major_axis: 0.723,
    temperature: 737,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description:
      'The second planet from the Sun, known as Earth\'s "sister planet".',
    funFact:
      "Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west and sets in the east.",
    imageKey: "venus",
  },
  {
    id: "earth",
    name: "Earth",
    mass: 1.0,
    radius: 1.0,
    period: 365.25,
    semi_major_axis: 1.0,
    temperature: 288,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description:
      "Our home planet and the only known celestial body to harbor life.",
    funFact: "Earth is the only planet not named after a Greek or Roman god.",
    imageKey: "earth",
  },
  {
    id: "mars",
    name: "Mars",
    mass: 0.107,
    radius: 0.532,
    period: 687.0,
    semi_major_axis: 1.524,
    temperature: 210,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description: 'The fourth planet from the Sun, known as the "Red Planet".',
    funFact:
      "Mars has the largest dust storms in the solar system, sometimes engulfing the entire planet for months.",
    imageKey: "mars",
  },
  {
    id: "jupiter",
    name: "Jupiter",
    mass: 317.8,
    radius: 10.973,
    period: 4331,
    semi_major_axis: 5.203,
    temperature: 165,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description: "The largest planet in our Solar System.",
    funFact:
      "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years.",
    imageKey: "jupiter",
  },
  {
    id: "saturn",
    name: "Saturn",
    mass: 95.2,
    radius: 9.14,
    period: 10747,
    semi_major_axis: 9.539,
    temperature: 134,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description:
      "The sixth planet from the Sun, famous for its stunning ring system.",
    funFact:
      "Saturn has 83 confirmed moons, the most of any planet in our solar system.",
    imageKey: "saturn",
  },
  {
    id: "uranus",
    name: "Uranus",
    mass: 14.6,
    radius: 3.981,
    period: 30589,
    semi_major_axis: 19.18,
    temperature: 76,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description:
      "The seventh planet from the Sun, an ice giant with a tilted axis.",
    funFact:
      "Uranus rotates on its side, with its axis tilted at 98 degrees from its orbital plane.",
    imageKey: "uranus",
  },
  {
    id: "neptune",
    name: "Neptune",
    mass: 17.2,
    radius: 3.865,
    period: 59800,
    semi_major_axis: 30.07,
    temperature: 72,
    distance_light_year: null,
    host_star_mass: 1.0,
    host_star_temperature: 5778,
    description:
      "The eighth and farthest known planet from the Sun, an ice giant.",
    funFact:
      "Neptune has the strongest winds in the Solar System, reaching speeds of 2,100 km/h (1,300 mph).",
    imageKey: "neptune",
  },
];

export const spaceFacts: SpaceFact[] = [
  {
    id: 1,
    title: "Cosmic Scale",
    description:
      "If the Sun were the size of a white blood cell, the Milky Way galaxy would be the size of the continental United States.",
    icon: "scale",
    extraDetail:
      "The Milky Way galaxy is estimated to contain 100-400 billion stars.",
  },
  {
    id: 2,
    title: "Space Smell",
    description:
      "Astronauts report that space smells like seared steak, hot metal, and welding fumes due to the presence of polycyclic aromatic hydrocarbons.",
    icon: "wind",
    extraDetail:
      "Space is a vacuum, so the smell is actually caused by particles on their spacesuits reacting with the airlock.",
  },
  {
    id: 3,
    title: "Floating Water",
    description:
      "In space, water doesn't flow—it forms floating blobs that astronauts can bounce around or even drink from mid-air.",
    icon: "droplets",
    extraDetail:
      "This is due to the lack of gravity in space, which causes surface tension to dominate the behavior of water.",
  },
  {
    id: 4,
    title: "Diamond Planets",
    description:
      "55 Cancri e is likely made largely of diamond, with a surface of graphite and diamond. It's worth an estimated $26.9 nonillion.",
    icon: "diamond",
    extraDetail:
      "55 Cancri e is a super-Earth exoplanet that orbits a star similar to our Sun.",
  },
  {
    id: 5,
    title: "Neutron Stars",
    description:
      "A teaspoon of neutron star material would weigh about 6 billion tons—as much as a mountain on Earth.",
    icon: "star",
    extraDetail:
      "Neutron stars are the smallest and densest stars known to exist.",
  },
  {
    id: 6,
    title: "Cosmic Sounds",
    description:
      'Space isn\'t silent. NASA has converted radio emissions from various planets into sound, creating eerie "space music."',
    icon: "music",
    extraDetail:
      "These sounds are not audible to the human ear in space, but can be converted into sound waves for us to hear.",
  },
];
