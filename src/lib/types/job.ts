export type ExperienceLevel = 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'EXPERT' | 'ANY';

export const EXPERIENCE_LEVEL_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: 'ANY', label: 'Any Level' },
  { value: 'JUNIOR', label: 'Junior (0-2 years)' },
  { value: 'MID_LEVEL', label: 'Mid Level (2-5 years)' },
  { value: 'SENIOR', label: 'Senior (5+ years)' },
  { value: 'EXPERT', label: 'Expert (10+ years)' },
];
export type JobType = 'MENTORSHIP' | 'JOB';
export type JobStatus = 'OPEN' | 'CLOSED';

export interface NewJobRequest {
  profileId: string;
  title: string;
  content: string;
  jobPrice?: number;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  tags?: string[];
}

export interface JobResponse {
  id: string;
  title: string;
  content: string;
  jobPrice: number;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
  createdAt: string;
  jobStatus: JobStatus;
  proposalCount: number;
  tags: string[];
}

export interface UpdateJobRequest {
  jobPrice: number;
  experienceLevel: ExperienceLevel;
}

export interface JobsPage {
  content: JobResponse[];
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  number: number;
}

export interface DetectToolsRequest {
  jobTitle: string;
  jobDescription: string;
}

export interface DetectToolsResponse {
  hasTools: boolean;
  tools: string[] | null;
}

export interface EnhanceDescriptionRequest {
  jobTitle: string;
  jobDescription: string;
  tools?: string[];
}

export interface EnhanceDescriptionResponse {
  originalDescription: string;
  enhancedDescription: string;
}
