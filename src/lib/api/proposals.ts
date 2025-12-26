import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { CreateProposalRequest, ProposalResponse, EditProposalRequest } from '../types/proposal';

export async function createProposal(
  data: CreateProposalRequest
): Promise<ApiResponse<{ proposalId: string }>> {
  return apiClient.post<ApiResponse<{ proposalId: string }>, CreateProposalRequest>(
    '/proposals',
    data,
    { requiresAuth: true }
  );
}

export async function getMyProposals(): Promise<ApiResponse<ProposalResponse[]>> {
  return apiClient.get<ApiResponse<ProposalResponse[]>>(
    '/proposals/my',
    { requiresAuth: true }
  );
}

export async function getProposalById(id: string): Promise<ApiResponse<ProposalResponse>> {
  return apiClient.get<ApiResponse<ProposalResponse>>(
    `/proposals/${id}`,
    { requiresAuth: true }
  );
}

export async function editProposal(
  proposalId: string,
  data: EditProposalRequest
): Promise<ApiResponse<{ proposalId: string }>> {
  return apiClient.patch<ApiResponse<{ proposalId: string }>, EditProposalRequest>(
    `/proposals/${proposalId}`,
    data,
    { requiresAuth: true }
  );
}

export async function deleteProposal(proposalId: string): Promise<ApiResponse<void>> {
  return apiClient.delete<ApiResponse<void>>(
    `/proposals/${proposalId}`,
    { requiresAuth: true }
  );
}
