export type DisputeStatus = 'PENDING' | 'RESOLVED';
export type DisputeInitiatorType = 'CLIENT' | 'FREELANCER';

export interface DisputeDetail {
  id: string;
  title: string;
  content: string;
  status: DisputeStatus;
  initiatorType: DisputeInitiatorType;
  initiatorFirstName: string;
  initiatorLastName: string;
  accusedFirstName: string;
  accusedLastName: string;
  createdAt: string;
  contractId: string;
}

export interface DisputeListItem {
  id: string;
  title: string;
  initiatorType: DisputeInitiatorType;
  initiatorFirstName: string;
  initiatorLastName: string;
  contractId: string;
}

export interface DisputePage {
  content: DisputeListItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
