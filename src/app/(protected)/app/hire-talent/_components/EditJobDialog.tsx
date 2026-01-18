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
import type { JobResponse, ExperienceLevel } from '@/lib/types/job';

interface EditJobDialogProps {
  job: JobResponse | null;
  isUpdating: boolean;
  onClose: () => void;
  onUpdate: (jobId: string, data: { jobPrice: number; experienceLevel: ExperienceLevel }) => void;
}

export function EditJobDialog({ job, isUpdating, onClose, onUpdate }: EditJobDialogProps) {
  const [editPrice, setEditPrice] = useState(0);
  const [editExperience, setEditExperience] = useState<ExperienceLevel>('ANY');

  useEffect(() => {
    if (job) {
      setEditPrice(job.jobPrice);
      setEditExperience(job.experienceLevel);
    }
  }, [job]);

  const handleUpdate = () => {
    if (!job) return;
    onUpdate(job.id, {
      jobPrice: editPrice,
      experienceLevel: editExperience,
    });
  };

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
                <SelectItem value="ANY">Any Level</SelectItem>
                <SelectItem value="JUNIOR">Junior (0-2 years)</SelectItem>
                <SelectItem value="MID_LEVEL">Mid Level (2-5 years)</SelectItem>
                <SelectItem value="SENIOR">Senior (5+ years)</SelectItem>
                <SelectItem value="EXPERT">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
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
