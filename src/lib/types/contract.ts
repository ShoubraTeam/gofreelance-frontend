export type ContractStatus = 'OPEN' | 'ON_DISPUTE' | 'CLOSED';
export type MilestoneStatus =
  | 'PENDING'
  | 'NOT_FUNDED'
  | 'IN_PROGRESS'
  | 'UNDER_REVIEW'
  | 'COMPLETED'
  | 'REJECTED';

export interface ContractResponse {
  contractId: string;
  authorId: string | null;
  proposalId: string;
  contractStatus: ContractStatus;
  createdAt: string;
  freelancerId: string | null;
  rated: boolean;
}

export interface MilestoneResponse {
  id: string;
  contractId: string;
  content: string;
  price: number;
  status: MilestoneStatus;
  startedAt: string | null;
  endedAt: string | null;
  createdAt: string;
  fileName: string | null;
}
