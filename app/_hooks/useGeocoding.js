import { useQuery } from "@tanstack/react-query";

export function useGeocoding(searchTerm) {
  const buildApiUrl = () => {
    const params = new URLSearchParams({
      name: searchTerm,
      count: 10,
      language: "en",
      format: "json",
    });

    return `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
  };

  return useQuery({
    queryKey: ["geocoding", searchTerm],
    queryFn: async () => {
      const response = await fetch(buildApiUrl());
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }
      const data = await response.json();

      return data.results || [];
    },
    staleTime: 1000 * 60 * 60,
    enabled: !!searchTerm && searchTerm.length >= 2,
  });
}
