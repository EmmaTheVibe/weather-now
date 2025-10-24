import { useQuery } from "@tanstack/react-query";

export function useWeather(
  lat,
  lon,
  tempUnit = "celsius",
  windUnit = "kmh",
  precipUnit = "mm"
) {
  const buildApiUrl = () => {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
      ].join(","),
      hourly: [
        "temperature_2m",
        "weather_code",
        "apparent_temperature",
        "relative_humidity_2m",
        "wind_speed_10m",
        "precipitation",
      ].join(","),
      daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"].join(
        ","
      ),
      temperature_unit: tempUnit,
      wind_speed_unit: windUnit,
      precipitation_unit: precipUnit,
      timezone: "auto",
    });

    return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  };

  return useQuery({
    queryKey: ["weather", lat, lon, tempUnit, windUnit, precipUnit],
    queryFn: async () => {
      const response = await fetch(buildApiUrl());
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 10,
    enabled: !!lat && !!lon,
  });
}
