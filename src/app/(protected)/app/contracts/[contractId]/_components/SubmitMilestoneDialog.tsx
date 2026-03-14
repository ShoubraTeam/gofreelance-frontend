'use client';

import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { submitMilestone } from '@/lib/api/contracts';
import { Loader2 } from 'lucide-react';
import { FiUpload } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface SubmitMilestoneDialogProps {
  milestoneId: string;
  contractId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SubmitMilestoneDialog({
  milestoneId,
  contractId,
  open,
  onOpenChange,
}: SubmitMilestoneDialogProps) {
  const queryClient = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate: submit, isPending } = useMutation({
    mutationFn: () => submitMilestone(milestoneId, selectedFile!),
    onSuccess: () => {
      toast.success('Milestone submitted.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
      onOpenChange(false);
      setSelectedFile(null);
    },
    onError: (err: Error) => toast.error(err.message || 'Failed to submit milestone.'),
  });

  const handleOpenChange = (val: boolean) => {
    if (!isPending) {
      onOpenChange(val);
      if (!val) setSelectedFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Submit Milestone</DialogTitle>
        </DialogHeader>

        <div
          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => inputRef.current?.click()}
        >
          <FiUpload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          {selectedFile ? (
            <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
          ) : (
            <p className="text-sm text-muted-foreground">Click to select a file</p>
          )}
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={() => submit()} disabled={!selectedFile || isPending}>
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
