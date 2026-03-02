'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMilestone } from '@/lib/api/contracts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface AddMilestoneFormProps {
  contractId: string;
}

export function AddMilestoneForm({ contractId }: AddMilestoneFormProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [startedAt, setStartedAt] = useState('');
  const [endedAt, setEndedAt] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      addMilestone(contractId, {
        content,
        price: parseFloat(price),
        startedAt: startedAt || undefined,
        endedAt: endedAt || undefined,
      }),
    onSuccess: () => {
      toast.success('Milestone added.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
      setContent('');
      setPrice('');
      setStartedAt('');
      setEndedAt('');
    },
    onError: () => {
      toast.error('Failed to add milestone.');
    },
  });

  const isValid = content.trim().length > 0 && parseFloat(price) > 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Add Milestone</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="content">Description</Label>
          <Textarea
            id="content"
            placeholder="Describe this milestone..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="startedAt">Start Date (optional)</Label>
            <Input
              id="startedAt"
              type="date"
              value={startedAt}
              onChange={(e) => setStartedAt(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="endedAt">End Date (optional)</Label>
            <Input
              id="endedAt"
              type="date"
              value={endedAt}
              onChange={(e) => setEndedAt(e.target.value)}
            />
          </div>
        </div>

        <Button onClick={() => mutate()} disabled={!isValid || isPending} className="w-full">
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add Milestone'}
        </Button>
      </CardContent>
    </Card>
  );
}
