import { apiClient } from './client';
import { useAuthStore } from '@/store/useAuthStore';
import type { ApiResponse } from '../types/api';
import type { ContractResponse, MilestoneResponse } from '../types/contract';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.gofreelance.app/api/v1'
    : 'http://localhost:8080/api/v1';

function getAuthToken(): string {
  return useAuthStore.getState().accessToken ?? '';
}

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

export async function approveMilestone(
  milestoneId: string
): Promise<ApiResponse<MilestoneResponse>> {
  return apiClient.patch<ApiResponse<MilestoneResponse>, Record<string, never>>(
    `/milestones/${milestoneId}/approve`,
    {},
    { requiresAuth: true }
  );
}

export async function submitMilestone(
  milestoneId: string,
  file: File
): Promise<ApiResponse<MilestoneResponse>> {
  const form = new FormData();
  form.append('file', file);

  const response = await fetch(`${API_BASE_URL}/milestones/${milestoneId}/submit`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${getAuthToken()}` },
    body: form,
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { error?: string; message?: string };
    throw new Error(errorData.error || errorData.message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function downloadMilestone(milestoneId: string): Promise<string> {
  const res = await apiClient.get<ApiResponse<{ fileUrl: string }>>(
    `/milestones/${milestoneId}/download`,
    { requiresAuth: true }
  );
  return res.data.fileUrl;
}
