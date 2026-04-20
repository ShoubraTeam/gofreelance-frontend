import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type {
  NewJobRequest,
  JobResponse,
  UpdateJobRequest,
  JobsPage,
  DetectToolsRequest,
  DetectToolsResponse,
  EnhanceDescriptionRequest,
  EnhanceDescriptionResponse,
} from '../types/job';
import type { ProposalsPage } from '../types/proposal';

export async function createJob(
  data: NewJobRequest
): Promise<ApiResponse<string>> {
  return apiClient.post<ApiResponse<string>, NewJobRequest>(
    '/jobs',
    data,
    { requiresAuth: true }
  );
}

export async function getClientJobs(
  clientId: string
): Promise<ApiResponse<JobResponse[]>> {
  return apiClient.get<ApiResponse<JobResponse[]>>(
    `/jobs/client/${clientId}`,
    { requiresAuth: true }
  );
}

export async function updateJob(
  id: string,
  data: UpdateJobRequest
): Promise<ApiResponse<string>> {
  return apiClient.patch<ApiResponse<string>, UpdateJobRequest>(
    `/jobs/${id}`,
    data,
    { requiresAuth: true }
  );
}

export async function getPublicJobs(page = 0, jobType?: 'JOB' | 'MENTORSHIP'): Promise<ApiResponse<JobsPage>> {
  const params = new URLSearchParams({
    'page': page.toString(),
    'size': '10',
  });
  if (jobType) params.set('jobType', jobType);

  return apiClient.get<ApiResponse<JobsPage>>(
    `/jobs/public?${params.toString()}`,
    { requiresAuth: false }
  );
}

export async function getFreelancerJobs(
  profileId: string
): Promise<ApiResponse<JobResponse[]>> {
  return apiClient.get<ApiResponse<JobResponse[]>>(
    `/jobs/client/${profileId}`,
    { requiresAuth: true }
  );
}

export async function getJobProposals(
  jobId: string,
  page = 0,
  size = 10
): Promise<ApiResponse<ProposalsPage>> {
  return apiClient.get<ApiResponse<ProposalsPage>>(
    `/jobs/${jobId}/proposals?page=${page}&size=${size}`,
    { requiresAuth: true }
  );
}

export async function getJobById(id: string): Promise<ApiResponse<JobResponse>> {
  return apiClient.get<ApiResponse<JobResponse>>(
    `/jobs/public/${id}`,
    { requiresAuth: false }
  );
}

export async function detectTools(
  data: DetectToolsRequest
): Promise<ApiResponse<DetectToolsResponse>> {
  return apiClient.post<ApiResponse<DetectToolsResponse>, DetectToolsRequest>(
    '/jobs/suggestions/detect-tool',
    data,
    { requiresAuth: true }
  );
}

export async function enhanceDescription(
  data: EnhanceDescriptionRequest
): Promise<ApiResponse<EnhanceDescriptionResponse>> {
  return apiClient.post<ApiResponse<EnhanceDescriptionResponse>, EnhanceDescriptionRequest>(
    '/jobs/suggestions/enhance-description',
    data,
    { requiresAuth: true }
  );
}

export async function addJobTags(
  jobId: string,
  tags: string[]
): Promise<ApiResponse<void>> {
  return apiClient.post<ApiResponse<void>, { tags: string[] }>(
    `/jobs/${jobId}/tags`,
    { tags },
    { requiresAuth: true }
  );
}

export async function removeJobTags(
  jobId: string,
  tags: string[]
): Promise<ApiResponse<void>> {
  return apiClient.request<ApiResponse<void>, { tags: string[] }>(
    'DELETE',
    `/jobs/${jobId}/tags`,
    { tags },
    { requiresAuth: true }
  );
}
