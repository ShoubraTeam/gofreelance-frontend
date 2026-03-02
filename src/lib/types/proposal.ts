export type ProposalStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface CreateProposalRequest {
  jobId: string;
  freelancerProfileId: string;
  content: string;
  totalTimeHours: number;
  totalPrice: number;
}

export interface ProposalResponse {
  id: string;
  jobId: string;
  freelancerProfileId: string;
  fullName: string;
  bio: string;
  averageRating: number;
  content: string;
  totalTimeHours: number;
  totalPrice: number;
  status: ProposalStatus;
  createdAt: string;
}

export interface EditProposalRequest {
  content: string;
  totalTimeHours: number;
  totalPrice: number;
}

export interface ProposalsPage {
  content: ProposalResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
