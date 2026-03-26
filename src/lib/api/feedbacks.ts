import { apiClient } from './client';
import type { ApiResponse } from '../types/api';

export interface SubmitFeedbackRequest {
  contractId: string;
  rating: number;
  content?: string;
}

export async function submitFeedback(
  data: SubmitFeedbackRequest
): Promise<ApiResponse<{ contractId: string }>> {
  return apiClient.post<ApiResponse<{ contractId: string }>, SubmitFeedbackRequest>(
    '/feedbacks',
    data,
    { requiresAuth: true }
  );
}
