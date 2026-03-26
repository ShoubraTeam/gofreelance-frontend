import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { DisputeDetail, DisputePage } from '../types/dispute';

export interface CreateDisputeRequest {
  contractId: string;
  title: string;
  content: string;
}

export async function createDispute(
  data: CreateDisputeRequest
): Promise<ApiResponse<{ disputeId: string }>> {
  return apiClient.post<ApiResponse<{ disputeId: string }>, CreateDisputeRequest>(
    '/disputes',
    data,
    { requiresAuth: true }
  );
}

export async function getDisputeById(disputeId: string): Promise<ApiResponse<DisputeDetail>> {
  return apiClient.get<ApiResponse<DisputeDetail>>(`/disputes/${disputeId}`, {
    requiresAuth: true,
  });
}

export async function getMyDisputes(page = 0): Promise<ApiResponse<DisputePage>> {
  return apiClient.get<ApiResponse<DisputePage>>(`/disputes?page=${page}`, {
    requiresAuth: true,
  });
}
