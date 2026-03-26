'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createDispute } from '@/lib/api/disputes';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CreateDisputeDialogProps {
  contractId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDisputeDialog({ contractId, open, onOpenChange }: CreateDisputeDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => createDispute({ contractId, title: title.trim(), content: content.trim() }),
    onSuccess: () => {
      toast.success('Dispute submitted successfully.');
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      setTitle('');
      setContent('');
      onOpenChange(false);
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to create dispute.'),
  });

  const canSubmit = title.trim().length > 0 && content.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!isPending) onOpenChange(v); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Open a Dispute</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="dispute-title">Title</Label>
            <Input
              id="dispute-title"
              placeholder="e.g. Milestone was not delivered as agreed"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dispute-content">Description</Label>
            <Textarea
              id="dispute-content"
              placeholder="Describe the issue in detail…"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={() => mutate()} disabled={!canSubmit || isPending}>
            {isPending ? 'Submitting…' : 'Submit Dispute'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
