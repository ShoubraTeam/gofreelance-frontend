import { apiClient } from './client';
import type { CountryResponse } from '../types/country';

export async function getCountries(): Promise<CountryResponse> {
  return apiClient.get<CountryResponse>('/country');
}
