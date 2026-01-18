import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import type { ProposalResponse } from '@/lib/types/proposal';

interface ProposalDisplayProps {
  proposal: ProposalResponse;
  isDeleting: boolean;
  isPending: boolean;
  onEdit: () => void;
  onWithdraw: () => void;
}

export function ProposalDisplay({
  proposal,
  isDeleting,
  isPending,
  onEdit,
  onWithdraw,
}: ProposalDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">Proposal</p>
        <p className="text-foreground whitespace-pre-wrap">{proposal.content}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Your Bid</p>
          <p className="text-2xl font-bold text-primary">
            ${proposal.totalPrice.toLocaleString()}
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Estimated Hours</p>
          <p className="text-2xl font-bold text-foreground">
            {proposal.totalTimeHours} hours
          </p>
        </div>
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground mb-1">Submitted On</p>
        <p className="text-foreground">
          {new Date(proposal.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onEdit}
          variant="outline"
          disabled={proposal.status !== 'PENDING'}
        >
          Edit Proposal
        </Button>
        <Button
          onClick={onWithdraw}
          variant="destructive"
          disabled={isPending || proposal.status !== 'PENDING'}
        >
          {isDeleting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Withdrawing...
            </>
          ) : (
            'Withdraw Proposal'
          )}
        </Button>
      </div>
    </div>
  );
}
