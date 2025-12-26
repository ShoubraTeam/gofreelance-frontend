import { apiClient } from './client';
import type {
  GetProfileResponse,
  CreateClientProfileRequest,
  CreateFreelancerProfileRequest,
  EditClientProfileRequest,
  EditFreelancerProfileRequest,
  CreateProfileResponse,
  EditProfileResponse,
  SpecializationResponse,
  GetFreelancerProfileDetailsResponse,
  GetClientProfileDetailsResponse,
} from '../types/profile';
import type { ApiResponse } from '../types/api';

export async function getProfiles(): Promise<
  ApiResponse<GetProfileResponse[]>
> {
  return apiClient.get<ApiResponse<GetProfileResponse[]>>('/profile', {
    requiresAuth: true,
  });
}

export async function createClientProfile(
  data: CreateClientProfileRequest
): Promise<ApiResponse<CreateProfileResponse>> {
  return apiClient.post<
    ApiResponse<CreateProfileResponse>,
    CreateClientProfileRequest
  >('/profile/client', data, { requiresAuth: true });
}

export async function createFreelancerProfile(
  data: CreateFreelancerProfileRequest
): Promise<ApiResponse<CreateProfileResponse>> {
  return apiClient.post<
    ApiResponse<CreateProfileResponse>,
    CreateFreelancerProfileRequest
  >('/profile/freelancer', data, { requiresAuth: true });
}

export async function editClientProfile(
  data: EditClientProfileRequest
): Promise<ApiResponse<EditProfileResponse>> {
  return apiClient.patch<
    ApiResponse<EditProfileResponse>,
    EditClientProfileRequest
  >('/profile/client', data, { requiresAuth: true });
}

export async function editFreelancerProfile(
  data: EditFreelancerProfileRequest
): Promise<ApiResponse<EditProfileResponse>> {
  return apiClient.patch<
    ApiResponse<EditProfileResponse>,
    EditFreelancerProfileRequest
  >('/profile/freelancer', data, { requiresAuth: true });
}

export async function getFreelancerProfileDetails(
  profileId: string
): Promise<ApiResponse<GetFreelancerProfileDetailsResponse>> {
  return apiClient.get<ApiResponse<GetFreelancerProfileDetailsResponse>>(
    `/profile/freelancer/${profileId}`,
    { requiresAuth: true }
  );
}

export async function getClientProfileDetails(
  profileId: string
): Promise<ApiResponse<GetClientProfileDetailsResponse>> {
  return apiClient.get<ApiResponse<GetClientProfileDetailsResponse>>(
    `/profile/client/${profileId}`,
    { requiresAuth: true }
  );
}

export async function getSpecializations(): Promise<
  ApiResponse<SpecializationResponse[]>
> {
  return apiClient.get<ApiResponse<SpecializationResponse[]>>(
    '/profile/freelancer/specialization',
    { requiresAuth: true }
  );
}

export async function getAllSkills(): Promise<
  ApiResponse<import('../types/profile').Skill[]>
> {
  return apiClient.get<ApiResponse<import('../types/profile').Skill[]>>(
    '/profile/freelancer/skills',
    { requiresAuth: true }
  );
}

export async function addSkills(
  data: import('../types/profile').SkillsRequest
): Promise<ApiResponse<{ profileId: string }>> {
  return apiClient.post<
    ApiResponse<{ profileId: string }>,
    import('../types/profile').SkillsRequest
  >('/profile/freelancer/skills', data, { requiresAuth: true });
}

export async function deleteSkills(
  data: import('../types/profile').SkillsRequest
): Promise<ApiResponse<{ profileId: string }>> {
  return apiClient.delete<ApiResponse<{ profileId: string }>>(
    '/profile/freelancer/skills',
    { requiresAuth: true, body: JSON.stringify(data) }
  );
}

export async function addWorkExperience(
  data: import('../types/profile').WorkExperienceRequest
): Promise<ApiResponse<{ profileId: string; workedAt: string }>> {
  return apiClient.post<
    ApiResponse<{ profileId: string; workedAt: string }>,
    import('../types/profile').WorkExperienceRequest
  >('/profile/freelancer/work-experience', data, { requiresAuth: true });
}

export async function editWorkExperience(
  data: import('../types/profile').WorkExperienceRequest
): Promise<ApiResponse<{ profileId: string; workedAt: string }>> {
  return apiClient.patch<
    ApiResponse<{ profileId: string; workedAt: string }>,
    import('../types/profile').WorkExperienceRequest
  >('/profile/freelancer/work-experience', data, { requiresAuth: true });
}

export async function deleteWorkExperience(
  profileId: string,
  workedAt: string
): Promise<ApiResponse<{ profileId: string; workedAt: string }>> {
  return apiClient.delete<
    ApiResponse<{ profileId: string; workedAt: string }>
  >(`/profile/freelancer/work-experience/${profileId}/${workedAt}`, {
    requiresAuth: true,
  });
}

export async function addProject(
  data: import('../types/profile').ProjectRequest
): Promise<ApiResponse<{ profileId: string; title: string }>> {
  return apiClient.post<
    ApiResponse<{ profileId: string; title: string }>,
    import('../types/profile').ProjectRequest
  >('/profile/freelancer/projects', data, { requiresAuth: true });
}

export async function editProject(
  data: import('../types/profile').ProjectRequest
): Promise<ApiResponse<{ profileId: string; title: string }>> {
  return apiClient.patch<
    ApiResponse<{ profileId: string; title: string }>,
    import('../types/profile').ProjectRequest
  >('/profile/freelancer/projects', data, { requiresAuth: true });
}

export async function deleteProject(
  profileId: string,
  projectTitle: string
): Promise<ApiResponse<{ profileId: string; title: string }>> {
  return apiClient.delete<ApiResponse<{ profileId: string; title: string }>>(
    `/profile/freelancer/projects/${profileId}/${encodeURIComponent(projectTitle)}`,
    { requiresAuth: true }
  );
}

export async function addCertificate(
  data: import('../types/profile').CertificateRequest
): Promise<ApiResponse<{ certificateId: string; name: string }>> {
  return apiClient.post<
    ApiResponse<{ certificateId: string; name: string }>,
    import('../types/profile').CertificateRequest
  >('/profile/freelancer/certificates', data, { requiresAuth: true });
}

export async function editCertificate(
  data: import('../types/profile').CertificateRequest
): Promise<ApiResponse<{ certificateId: string; name: string }>> {
  return apiClient.patch<
    ApiResponse<{ certificateId: string; name: string }>,
    import('../types/profile').CertificateRequest
  >('/profile/freelancer/certificates', data, { requiresAuth: true });
}

export async function deleteCertificate(
  profileId: string,
  certificateName: string
): Promise<ApiResponse<{ certificateId: string; name: string }>> {
  return apiClient.delete<
    ApiResponse<{ certificateId: string; name: string }>
  >(
    `/profile/freelancer/certificates/${profileId}/${encodeURIComponent(certificateName)}`,
    { requiresAuth: true }
  );
}
