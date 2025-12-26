export type ProfileType = 'FREELANCER' | 'CLIENT';
export type SpecializationStatus = 'ACTIVE' | 'INACTIVE';

export interface GetProfileResponse {
  id: string;
  bio: string;
  averageRatings: number;
  numberOfRatings: number;
  visible: boolean;
  createdAt: string;
  profileType: ProfileType;
}

export interface CreateClientProfileRequest {
  bio: string;
  companyName: string;
}

export interface CreateFreelancerProfileRequest {
  title: string;
  bio: string;
  specializationId: string;
}

export interface EditClientProfileRequest {
  id: string;
  bio?: string;
  companyName?: string;
}

export interface EditFreelancerProfileRequest {
  id: string;
  title?: string;
  bio?: string;
}

export interface CreateProfileResponse {
  profileId: string;
}

export interface EditProfileResponse {
  profileId: string;
}

export interface SpecializationResponse {
  id: string;
  type: string;
}

export interface Specialization {
  id: string;
  type: string;
  specializationStatus: SpecializationStatus;
}

export interface Skill {
  id: string;
  name: string;
}

export interface ProjectDetail {
  profileId: string;
  title: string;
  imageUrl?: string;
  projectUrl?: string;
  fileUrl?: string;
  content?: string;
}

export interface WorkExperienceDetail {
  profileId: string;
  workedAt: string;
  jobTitle?: string;
  startedAt?: string;
  endedAt?: string;
}

export interface CertificateDetail {
  profileId: string;
  name: string;
  imageUrl?: string;
}

export interface GetFreelancerProfileDetailsResponse {
  id: string;
  title: string;
  bio: string;
  averageRatings: number;
  numberOfRatings: number;
  createdAt: string;
  specialization: Specialization;
  skills: Skill[];
  projects: ProjectDetail[];
  workExperiences: WorkExperienceDetail[];
  certificates: CertificateDetail[];
}

export interface GetClientProfileDetailsResponse {
  id: string;
  bio: string;
  averageRatings: number;
  numberOfRatings: number;
  createdAt: string;
  companyName: string;
}

export interface SkillsRequest {
  profileId: string;
  skillsId: string[];
}

export interface WorkExperienceRequest {
  profileId: string;
  workAt: string;
  jobTitle?: string;
  startedAt?: string;
  endedAt?: string;
}

export interface ProjectRequest {
  profileId: string;
  title: string;
  content?: string;
  imageUrl?: string;
  projectUrl?: string;
  fileUrl?: string;
}

export interface CertificateRequest {
  profileId: string;
  certificateName: string;
  certificateUrl?: string;
}
