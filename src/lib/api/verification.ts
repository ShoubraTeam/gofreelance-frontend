import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

interface IdentityVerificationRequest {
  image1Base64: string;
  image2Base64: string;
}

export interface IdentityVerificationResponse {
  verified: boolean;
  similarity: number;
  similarityThreshold: number;
}

export async function submitIdentityVerification(
  data: IdentityVerificationRequest
): Promise<ApiResponse<IdentityVerificationResponse>> {
  return apiClient.post<ApiResponse<IdentityVerificationResponse>, IdentityVerificationRequest>(
    '/verification/identity',
    data,
    { requiresAuth: true }
  );
}
