'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { addWorkExperience, editWorkExperience } from '@/lib/api/profile';
import type { WorkExperienceDetail } from '@/lib/types/profile';
import toast from 'react-hot-toast';

interface WorkExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  experience?: WorkExperienceDetail;
  onSuccess: () => void;
  onDelete?: () => void;
}

export function WorkExperienceDialog({
  open,
  onOpenChange,
  profileId,
  experience,
  onSuccess,
  onDelete,
}: WorkExperienceDialogProps) {
  const [workAt, setWorkAt] = useState(experience?.workedAt || '');
  const [jobTitle, setJobTitle] = useState(experience?.jobTitle || '');
  const [startedAt, setStartedAt] = useState(experience?.startedAt || '');
  const [endedAt, setEndedAt] = useState(experience?.endedAt || '');

  // Reset form state when dialog opens - this is intentional and safe
  useEffect(() => {
    if (open) {
       
      setWorkAt(experience?.workedAt || '');
       
      setJobTitle(experience?.jobTitle || '');
       
      setStartedAt(experience?.startedAt || '');
       
      setEndedAt(experience?.endedAt || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const { mutate, isPending } = useMutation({
    mutationFn: experience ? editWorkExperience : addWorkExperience,
    onSuccess: () => {
      toast.success(
        `Work experience ${experience ? 'updated' : 'added'} successfully`
      );
      onOpenChange(false);
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to save work experience');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({
      profileId,
      workAt,
      jobTitle: jobTitle || undefined,
      startedAt: startedAt || undefined,
      endedAt: endedAt || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {experience ? 'Edit' : 'Add'} Work Experience
            </DialogTitle>
            <DialogDescription>
              {experience
                ? 'Update your work experience details'
                : 'Add a new work experience to your profile'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="workAt">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="workAt"
                value={workAt}
                onChange={(e) => setWorkAt(e.target.value)}
                placeholder="e.g. Tech Company Inc."
                required
                disabled={isPending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Developer"
                disabled={isPending}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startedAt">Start Date</Label>
                <Input
                  id="startedAt"
                  type="date"
                  value={startedAt}
                  onChange={(e) => setStartedAt(e.target.value)}
                  disabled={isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endedAt">End Date</Label>
                <Input
                  id="endedAt"
                  type="date"
                  value={endedAt}
                  onChange={(e) => setEndedAt(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center w-full">
            {experience && onDelete ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onDelete}
                  disabled={isPending}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  Delete work experience
                </Button>
                <Button type="submit" disabled={isPending || !workAt}>
                  {isPending ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button type="submit" disabled={isPending || !workAt} className="ml-auto">
                {isPending ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
