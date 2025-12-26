export type ExperienceLevel = 'JUNIOR' | 'MID_LEVEL' | 'SENIOR' | 'EXPERT' | 'ANY';
export type JobType = 'MENTORSHIP' | 'JOB';
export type JobStatus = 'OPEN' | 'CLOSED';

export interface NewJobRequest {
  title: string;
  content: string;
  jobPrice: number;
  experienceLevel: ExperienceLevel;
  jobType: JobType;
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
}

export interface UpdateJobRequest {
  id: string;
  jobPrice: number;
  experienceLevel: ExperienceLevel;
}
