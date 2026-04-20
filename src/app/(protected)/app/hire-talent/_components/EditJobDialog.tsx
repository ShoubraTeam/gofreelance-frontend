'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { JobResponse, ExperienceLevel } from '@/lib/types/job';
import { EXPERIENCE_LEVEL_OPTIONS } from '@/lib/types/job';
import { addJobTags, removeJobTags } from '@/lib/api/jobs';
import { TagInput } from './TagInput';

interface EditJobDialogProps {
  job: JobResponse | null;
  isUpdating: boolean;
  onClose: () => void;
  onUpdate: (jobId: string, data: { jobPrice: number; experienceLevel: ExperienceLevel }) => void;
}

export function EditJobDialog({ job, isUpdating, onClose, onUpdate }: EditJobDialogProps) {
  const [editPrice, setEditPrice] = useState(0);
  const [editExperience, setEditExperience] = useState<ExperienceLevel>('ANY');
  const [tags, setTags] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (job) {
      setEditPrice(job.jobPrice);
      setEditExperience(job.experienceLevel);
      setTags(job.tags ?? []);
    }
  }, [job]);

  const isOpen = job?.jobStatus === 'OPEN';

  const { mutate: addTags, isPending: isAddingTags } = useMutation({
    mutationFn: ({ jobId, tags }: { jobId: string; tags: string[] }) =>
      addJobTags(jobId, tags),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-jobs'] });
    },
    onError: () => {
      toast.error('Failed to add tags');
      if (job) setTags(job.tags ?? []);
    },
  });

  const { mutate: removeTags, isPending: isRemovingTags } = useMutation({
    mutationFn: ({ jobId, tags }: { jobId: string; tags: string[] }) =>
      removeJobTags(jobId, tags),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-jobs'] });
    },
    onError: () => {
      toast.error('Failed to remove tags');
      if (job) setTags(job.tags ?? []);
    },
  });

  const handleTagsChange = (newTags: string[]) => {
    if (!job || !isOpen) return;
    const prev = tags;
    setTags(newTags);

    const added = newTags.filter((t) => !prev.includes(t));
    const removed = prev.filter((t) => !newTags.includes(t));

    if (added.length > 0) addTags({ jobId: job.id, tags: added });
    if (removed.length > 0) removeTags({ jobId: job.id, tags: removed });
  };

  const handleUpdate = () => {
    if (!job) return;
    onUpdate(job.id, { jobPrice: editPrice, experienceLevel: editExperience });
  };

  const isTagsPending = isAddingTags || isRemovingTags;

  return (
    <Dialog open={!!job} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Job Title</label>
            <p className="text-sm text-muted-foreground">{job?.title}</p>
            <p className="text-xs text-muted-foreground italic">Title cannot be edited</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Budget ($)
              <span className="text-red-500 ml-1">*</span>
            </label>
            <Input
              type="number"
              value={editPrice}
              onChange={(e) => setEditPrice(Number(e.target.value))}
              min={1}
              placeholder="5000"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Experience Level</label>
            <Select
              value={editExperience}
              onValueChange={(value) => setEditExperience(value as ExperienceLevel)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold">Tags</label>
              {isTagsPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />}
            </div>
            {isOpen ? (
              <TagInput
                tags={tags}
                onChange={handleTagsChange}
                disabled={isTagsPending}
                placeholder="Add tags..."
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.length > 0
                  ? tags.map((t) => (
                      <span key={t} className="text-sm bg-primary text-primary-foreground px-2 py-0.5 rounded">{t}</span>
                    ))
                  : <p className="text-sm text-muted-foreground">No tags</p>
                }
                <p className="text-xs text-muted-foreground w-full">Tags cannot be edited on closed jobs</p>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Job'
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
