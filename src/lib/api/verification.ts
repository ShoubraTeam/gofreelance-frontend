import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

interface IdentityVerificationRequest {
  image1Base64: string;
  image2Base64: string;
}

export async function submitIdentityVerification(
  data: IdentityVerificationRequest
): Promise<ApiResponse<void>> {
  return apiClient.post<ApiResponse<void>, IdentityVerificationRequest>(
    '/verification/identity',
    data,
    { requiresAuth: true }
  );
}
