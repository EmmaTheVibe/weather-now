export const weatherMap = {
  0: {
    description: "Clear sky",
    emoji: "☀️",
    img: "./assets/images/icon-sunny.webp",
  },
  1: {
    description: "Mainly clear",
    emoji: "🌤️",
    img: "./assets/images/icon-sunny.webp",
  },
  2: {
    description: "Partly cloudy",
    emoji: "⛅",
    img: "./assets/images/icon-partly-cloudy.webp",
  },
  3: {
    description: "Overcast",
    emoji: "☁️",
    img: "./assets/images/icon-overcast.webp",
  },
  45: {
    description: "Foggy",
    emoji: "🌫️",
    img: "./assets/images/icon-fog.webp",
  },
  48: {
    description: "Depositing rime fog",
    emoji: "🌫️",
    img: "./assets/images/icon-fog.webp",
  },
  51: {
    description: "Light drizzle",
    emoji: "🌦️",
    img: "./assets/images/icon-drizzle.webp",
  },
  53: {
    description: "Moderate drizzle",
    emoji: "🌦️",
    img: "./assets/images/icon-drizzle.webp",
  },
  55: {
    description: "Dense drizzle",
    emoji: "🌧️",
    img: "./assets/images/icon-drizzle.webp",
  },
  56: {
    description: "Light freezing drizzle",
    emoji: "🌧️",
    img: "./assets/images/icon-drizzle.webp",
  },
  57: {
    description: "Dense freezing drizzle",
    emoji: "🌧️",
    img: "./assets/images/icon-drizzle.webp",
  },
  61: {
    description: "Slight rain",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  63: {
    description: "Moderate rain",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  65: {
    description: "Heavy rain",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  66: {
    description: "Light freezing rain",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  67: {
    description: "Heavy freezing rain",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  71: {
    description: "Slight snow fall",
    emoji: "🌨️",
    img: "./assets/images/icon-snow.webp",
  },
  73: {
    description: "Moderate snow fall",
    emoji: "🌨️",
    img: "./assets/images/icon-snow.webp",
  },
  75: {
    description: "Heavy snow fall",
    emoji: "❄️",
    img: "./assets/images/icon-snow.webp",
  },
  77: {
    description: "Snow grains",
    emoji: "🌨️",
    img: "./assets/images/icon-snow.webp",
  },
  80: {
    description: "Slight rain showers",
    emoji: "🌦️",
    img: "./assets/images/icon-rain.webp",
  },
  81: {
    description: "Moderate rain showers",
    emoji: "🌧️",
    img: "./assets/images/icon-rain.webp",
  },
  82: {
    description: "Violent rain showers",
    emoji: "⛈️",
    img: "./assets/images/icon-storm.webp",
  },
  85: {
    description: "Slight snow showers",
    emoji: "🌨️",
    img: "./assets/images/icon-snow.webp",
  },
  86: {
    description: "Heavy snow showers",
    emoji: "❄️",
    img: "./assets/images/icon-snow.webp",
  },
  95: {
    description: "Thunderstorm",
    emoji: "⛈️",
    img: "./assets/images/icon-storm.webp",
  },
  96: {
    description: "Thunderstorm with slight hail",
    emoji: "⛈️",
    img: "./assets/images/icon-storm.webp",
  },
  99: {
    description: "Thunderstorm with heavy hail",
    emoji: "⛈️",
    img: "./assets/images/icon-storm.webp",
  },
};

export function getWeatherInfo(code) {
  return weatherMap[code] || { description: "Unknown", emoji: "❓" };
}
