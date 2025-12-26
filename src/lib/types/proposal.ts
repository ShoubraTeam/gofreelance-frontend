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
