import { apiClient } from './client';
import type { ApiResponse } from '../types/api';
import type { NewJobRequest, JobResponse, UpdateJobRequest } from '../types/job';

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
    `/jobs/client?id=${clientId}`,
    { requiresAuth: true }
  );
}

export async function updateJob(
  data: UpdateJobRequest
): Promise<ApiResponse<string>> {
  return apiClient.patch<ApiResponse<string>, UpdateJobRequest>(
    '/jobs',
    data,
    { requiresAuth: true }
  );
}

export async function getPublicJobs(page = 0): Promise<ApiResponse<JobResponse[]>> {
  const params = new URLSearchParams({
    'page': page.toString(),
    'size': '10',
  });

  return apiClient.get<ApiResponse<JobResponse[]>>(
    `/jobs/public?${params.toString()}`,
    { requiresAuth: false }
  );
}

export async function getJobById(id: string): Promise<ApiResponse<JobResponse>> {
  return apiClient.get<ApiResponse<JobResponse>>(
    `/jobs/public/${id}`,
    { requiresAuth: false }
  );
}
