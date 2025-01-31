import { useQuery } from '@tanstack/react-query';
import { getCityFromCoords } from '../api/geocodingApi';

export function useReverseGeocode(coords) {
  return useQuery({
    queryKey: ['city', coords?.latitude, coords?.longitude],
    queryFn: () => getCityFromCoords(coords.latitude, coords.longitude),
    enabled: Boolean(coords?.latitude && coords?.longitude),
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });
}