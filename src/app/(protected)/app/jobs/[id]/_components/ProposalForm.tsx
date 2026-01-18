import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

interface ProposalFormProps {
  proposalContent: string;
  proposalPrice: string;
  proposalHours: string;
  jobPrice: number;
  isEditMode: boolean;
  isPending: boolean;
  onContentChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onHoursChange: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
}

export function ProposalForm({
  proposalContent,
  proposalPrice,
  proposalHours,
  jobPrice,
  isEditMode,
  isPending,
  onContentChange,
  onPriceChange,
  onHoursChange,
  onSubmit,
  onCancel,
}: ProposalFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">
          Your Proposal
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Textarea
          value={proposalContent}
          onChange={(e) => onContentChange(e.target.value)}
          rows={6}
          placeholder="Explain why you're the best fit for this job. Describe your relevant experience and how you plan to approach this project..."
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Write a compelling proposal to stand out from other freelancers
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Your Bid ($)
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="number"
            value={proposalPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            placeholder="5000"
            min={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Client&apos;s budget: ${jobPrice.toLocaleString()}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Estimated Hours
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            type="number"
            value={proposalHours}
            onChange={(e) => onHoursChange(e.target.value)}
            placeholder="40"
            min={1}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Total time needed to complete the project
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={onSubmit}
          disabled={isPending}
          size="lg"
          className="w-full sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {isEditMode ? 'Updating...' : 'Submitting...'}
            </>
          ) : (
            isEditMode ? 'Update Proposal' : 'Submit Proposal'
          )}
        </Button>
        {isEditMode && onCancel && (
          <Button
            onClick={onCancel}
            variant="outline"
            size="lg"
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
