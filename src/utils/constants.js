export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day/fog.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/day/rain.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/day/snow.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/day/storm.png", import.meta.url).href,
  },

  // Night weather card
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night/fog.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/night/rain.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/night/snow.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/night/storm.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    day: true,
    condition: "undefined",
    url: new URL("../assets/day/undefined.png", import.meta.url).href,
  },

  night: {
    day: false,
    condition: "undefined",
    url: new URL("../assets/night/undefined.png", import.meta.url).href,
  },
};

export const coordinates = {
  latitude: 40.7608,
  longitude: -111.891,
};

export const apiKey = "4cfd1f71683b84a2aa7b82bd223fad6a";
