import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export async function getCountries(): Promise<
  ApiResponse<Record<string, string[]>>
> {
  return apiClient.get<ApiResponse<Record<string, string[]>>>('/country');
}
