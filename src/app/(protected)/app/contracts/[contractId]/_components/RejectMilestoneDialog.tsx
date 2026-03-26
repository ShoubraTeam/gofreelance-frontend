'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { rejectMilestone } from '@/lib/api/contracts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RejectMilestoneDialogProps {
  milestoneId: string;
  contractId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RejectMilestoneDialog({
  milestoneId,
  contractId,
  open,
  onOpenChange,
}: RejectMilestoneDialogProps) {
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => rejectMilestone(milestoneId, content.trim()),
    onSuccess: () => {
      toast.success('Milestone rejected. A dispute has been opened automatically.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      setContent('');
      onOpenChange(false);
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to reject milestone.'),
  });

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isPending) onOpenChange(v); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Milestone</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Label htmlFor="reject-reason">Reason for rejection</Label>
          <Textarea
            id="reject-reason"
            placeholder="Describe why this submission does not meet the agreed specification…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <p className="text-xs text-muted-foreground">
            This will be used as the dispute content. A dispute will be opened automatically.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutate()}
            disabled={!content.trim() || isPending}
          >
            {isPending ? 'Rejecting…' : 'Reject & Open Dispute'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
