import { Badge } from '@/components/ui/badge';
import { FiBriefcase } from 'react-icons/fi';
import { ProposalDisplay } from './ProposalDisplay';
import { ProposalForm } from './ProposalForm';
import type { ProposalResponse } from '@/lib/types/proposal';

interface ProposalSectionProps {
  existingProposal: ProposalResponse | undefined;
  isEditMode: boolean;
  proposalContent: string;
  proposalPrice: string;
  proposalHours: string;
  jobPrice: number;
  isDeleting: boolean;
  isPending: boolean;
  onContentChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onHoursChange: (value: string) => void;
  onSubmit: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onWithdraw: () => void;
}

export function ProposalSection({
  existingProposal,
  isEditMode,
  proposalContent,
  proposalPrice,
  proposalHours,
  jobPrice,
  isDeleting,
  isPending,
  onContentChange,
  onPriceChange,
  onHoursChange,
  onSubmit,
  onEdit,
  onCancel,
  onWithdraw,
}: ProposalSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiBriefcase className="w-5 h-5 text-primary" />
          {existingProposal && !isEditMode
            ? 'Your Proposal'
            : 'Submit Your Proposal'}
        </h2>
        {existingProposal && !isEditMode && (
          <div className="flex gap-2">
            <Badge
              variant={
                existingProposal.status === 'PENDING'
                  ? 'default'
                  : existingProposal.status === 'ACCEPTED'
                  ? 'default'
                  : 'destructive'
              }
              className={
                existingProposal.status === 'PENDING'
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : existingProposal.status === 'ACCEPTED'
                  ? 'bg-green-500 hover:bg-green-600'
                  : ''
              }
            >
              {existingProposal.status}
            </Badge>
          </div>
        )}
      </div>

      {existingProposal && !isEditMode ? (
        <ProposalDisplay
          proposal={existingProposal}
          isDeleting={isDeleting}
          isPending={isPending}
          onEdit={onEdit}
          onWithdraw={onWithdraw}
        />
      ) : (
        <ProposalForm
          proposalContent={proposalContent}
          proposalPrice={proposalPrice}
          proposalHours={proposalHours}
          jobPrice={jobPrice}
          isEditMode={isEditMode}
          isPending={isPending}
          onContentChange={onContentChange}
          onPriceChange={onPriceChange}
          onHoursChange={onHoursChange}
          onSubmit={onSubmit}
          onCancel={isEditMode ? onCancel : undefined}
        />
      )}
    </div>
  );
}
