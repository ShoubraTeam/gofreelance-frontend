'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ContractResponse } from '@/lib/types/contract';
import type { MilestoneResponse } from '@/lib/types/contract';
import { capitalize } from '@/lib/utils';
import { CONTRACT_STATUS_STYLES, shortContractId } from '../../_components/contract-status';
import { CloseContractButton } from './CloseContractButton';
import { FiCalendar, FiAlertTriangle } from 'react-icons/fi';

interface ContractHeaderProps {
  contract: ContractResponse;
  milestones: MilestoneResponse[];
  isMentorship: boolean;
  isOwner: boolean;
  onOpenDispute: () => void;
}

export function ContractHeader({ contract, milestones, isMentorship, isOwner, onOpenDispute }: ContractHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {isMentorship ? 'Mentorship Contract' : 'Contract'} #{shortContractId(contract.contractId)}
        </h1>
        <p className="text-xs text-muted-foreground mt-1">{contract.contractId}</p>
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
          <FiCalendar className="w-4 h-4 text-primary" />
          <span>Created {new Date(contract.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!isMentorship && contract.contractStatus !== 'ON_DISPUTE' && (
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenDispute}
            className="text-destructive border-destructive/40 hover:bg-destructive/10"
          >
            <FiAlertTriangle className="w-4 h-4 mr-2" />
            Open Dispute
          </Button>
        )}
        {isOwner && contract.contractStatus === 'OPEN' && (
          <CloseContractButton contractId={contract.contractId} milestones={milestones} />
        )}
        <Badge className={CONTRACT_STATUS_STYLES[contract.contractStatus]}>
          {capitalize(contract.contractStatus)}
        </Badge>
      </div>
    </div>
  );
}
