'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createJob } from '@/lib/api/jobs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { EXPERIENCE_LEVEL_OPTIONS, type ExperienceLevel } from '@/lib/types/job';
import toast from 'react-hot-toast';

interface MentorshipCreationFormProps {
  freelancerProfileId: string;
  onCancel: () => void;
}

export function MentorshipCreationForm({ freelancerProfileId, onCancel }: MentorshipCreationFormProps) {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('ANY');

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createJob({
        profileId: freelancerProfileId,
        title: title.trim(),
        content: content.trim(),
        experienceLevel,
        jobType: 'MENTORSHIP',
      }),
    onSuccess: () => {
      toast.success('Mentorship posted successfully!');
      queryClient.invalidateQueries({ queryKey: ['freelancer-jobs', freelancerProfileId] });
      onCancel();
    },
    onError: () => {
      toast.error('Failed to post mentorship.');
    },
  });

  const isValid = title.trim().length > 0 && content.trim().length > 0;

  return (
    <Card className="mb-6 border-primary/20 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Post a Mentorship</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g. React fundamentals for beginners"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="content">Description</Label>
          <Textarea
            id="content"
            placeholder="Describe what you will teach, how many sessions, what mentees will learn..."
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Target Experience Level</Label>
          <Select value={experienceLevel} onValueChange={(v) => setExperienceLevel(v as ExperienceLevel)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={() => mutate()} disabled={!isValid || isPending} className="flex-1">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Post Mentorship'}
          </Button>
          <Button variant="ghost" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
