import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { FiBriefcase } from 'react-icons/fi';
import type { ProposalResponse } from '@/lib/types/proposal';

interface ApplicationFormProps {
  content: string;
  hours: string;
  isEditMode: boolean;
  isPending: boolean;
  isDeleting: boolean;
  existingApplication: ProposalResponse | undefined;
  onContentChange: (value: string) => void;
  onHoursChange: (value: string) => void;
  onSubmit: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onWithdraw: () => void;
}

export function ApplicationForm({
  content,
  hours,
  isEditMode,
  isPending,
  isDeleting,
  existingApplication,
  onContentChange,
  onHoursChange,
  onSubmit,
  onEdit,
  onCancel,
  onWithdraw,
}: ApplicationFormProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FiBriefcase className="w-5 h-5 text-primary" />
          {existingApplication && !isEditMode ? 'Your Application' : 'Apply to this Mentorship'}
        </h2>
        {existingApplication && !isEditMode && (
          <Badge
            variant={existingApplication.status === 'PENDING' ? 'default' : existingApplication.status === 'ACCEPTED' ? 'default' : 'destructive'}
            className={
              existingApplication.status === 'PENDING'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : existingApplication.status === 'ACCEPTED'
                ? 'bg-green-500 hover:bg-green-600'
                : ''
            }
          >
            {existingApplication.status}
          </Badge>
        )}
      </div>

      {existingApplication && !isEditMode ? (
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Your Message</p>
            <p className="text-foreground whitespace-pre-wrap">{existingApplication.content}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 w-48">
            <p className="text-sm text-muted-foreground mb-1">Estimated Hours</p>
            <p className="text-2xl font-bold text-foreground">{existingApplication.totalTimeHours}h</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Submitted On</p>
            <p className="text-foreground">{new Date(existingApplication.createdAt).toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onEdit} disabled={existingApplication.status !== 'PENDING'}>
              Edit Application
            </Button>
            <Button
              variant="destructive"
              onClick={onWithdraw}
              disabled={isPending || existingApplication.status !== 'PENDING'}
            >
              {isDeleting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Withdrawing...</> : 'Withdraw'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Why do you want to join this mentorship?
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              rows={5}
              placeholder="Describe your current experience level, what you hope to learn, and why you're a good fit..."
              className="resize-none"
            />
          </div>

          <div className="w-48">
            <label className="block text-sm font-semibold text-foreground mb-2">
              Available Hours
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              type="number"
              value={hours}
              onChange={(e) => onHoursChange(e.target.value)}
              placeholder="20"
              min={1}
            />
            <p className="text-xs text-muted-foreground mt-1">Hours you can dedicate</p>
          </div>

          <div className="flex gap-2">
            <Button onClick={onSubmit} disabled={isPending} size="lg">
              {isPending ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{isEditMode ? 'Updating...' : 'Submitting...'}</>
              ) : (
                isEditMode ? 'Update Application' : 'Submit Application'
              )}
            </Button>
            {isEditMode && (
              <Button onClick={onCancel} variant="outline" size="lg" disabled={isPending}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
