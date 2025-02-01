import { useQuery } from "@tanstack/react-query";
import { getGeoDataFromCoords } from "../api/geocodingApi";

export function useReverseGeocode(coords) {
  return useQuery({
    queryKey: ["geoData", coords?.latitude, coords?.longitude],
    queryFn: () => getGeoDataFromCoords(coords.latitude, coords.longitude),
    enabled: Boolean(coords?.latitude && coords?.longitude),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });
}
