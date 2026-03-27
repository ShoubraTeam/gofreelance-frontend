'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editMilestone } from '@/lib/api/contracts';
import type { MilestoneResponse } from '@/lib/types/contract';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface EditMilestoneDialogProps {
  milestone: MilestoneResponse;
  contractId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isMentorship?: boolean;
}

export function EditMilestoneDialog({
  milestone,
  contractId,
  open,
  onOpenChange,
  isMentorship = false,
}: EditMilestoneDialogProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState(milestone.content);
  const [price, setPrice] = useState(String(milestone.price ?? ''));

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      editMilestone(milestone.id, {
        content: content.trim() !== milestone.content ? content.trim() : undefined,
        price: !isMentorship && Number(price) !== milestone.price ? Number(price) : undefined,
      }),
    onSuccess: () => {
      toast.success('Milestone updated.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
      onOpenChange(false);
    },
    onError: () => toast.error('Failed to update milestone.'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    if (!isMentorship && (!price || Number(price) <= 0)) return;
    mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Milestone</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="content">Description</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              required
            />
          </div>

          {!isMentorship && (
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                min={1}
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
