import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { ContractResponse, MilestoneResponse } from '../types/contract';

export async function createContract(
  proposalId: string
): Promise<ApiResponse<{ contractId: string }>> {
  return apiClient.post<ApiResponse<{ contractId: string }>, { proposalId: string }>(
    '/contracts',
    { proposalId },
    { requiresAuth: true }
  );
}

export async function getContractsByProfileId(
  profileId: string
): Promise<ApiResponse<ContractResponse[]>> {
  return apiClient.get<ApiResponse<ContractResponse[]>>(
    `/profiles/${profileId}/contracts`,
    { requiresAuth: true }
  );
}

export async function getContractById(
  contractId: string
): Promise<ApiResponse<ContractResponse>> {
  return apiClient.get<ApiResponse<ContractResponse>>(
    `/contracts/${contractId}`,
    { requiresAuth: true }
  );
}

export async function getContractMilestones(
  contractId: string
): Promise<ApiResponse<MilestoneResponse[]>> {
  return apiClient.get<ApiResponse<MilestoneResponse[]>>(
    `/contracts/${contractId}/milestones`,
    { requiresAuth: true }
  );
}

export interface AddMilestoneRequest {
  content: string;
  price: number;
  startedAt?: string;
  endedAt?: string;
}

export async function addMilestone(
  contractId: string,
  data: AddMilestoneRequest
): Promise<ApiResponse<MilestoneResponse>> {
  return apiClient.post<ApiResponse<MilestoneResponse>, AddMilestoneRequest>(
    `/contracts/${contractId}/milestones`,
    data,
    { requiresAuth: true }
  );
}

export async function acceptMilestone(
  milestoneId: string
): Promise<ApiResponse<MilestoneResponse>> {
  return apiClient.patch<ApiResponse<MilestoneResponse>, Record<string, never>>(
    `/milestones/${milestoneId}/accept`,
    {},
    { requiresAuth: true }
  );
}

export async function fundMilestone(
  milestoneId: string
): Promise<ApiResponse<MilestoneResponse>> {
  return apiClient.patch<ApiResponse<MilestoneResponse>, Record<string, never>>(
    `/milestones/${milestoneId}/fund`,
    {},
    { requiresAuth: true }
  );
}

export interface EditMilestoneRequest {
  content?: string;
  price?: number;
}

export async function editMilestone(
  milestoneId: string,
  data: EditMilestoneRequest
): Promise<ApiResponse<MilestoneResponse>> {
  return apiClient.patch<ApiResponse<MilestoneResponse>, EditMilestoneRequest>(
    `/milestones/${milestoneId}`,
    data,
    { requiresAuth: true }
  );
}
