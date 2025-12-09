import { useQuery } from '@tanstack/react-query';
import { getCountries } from '@/lib/api/country';

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
    staleTime: Infinity,
  });
}
