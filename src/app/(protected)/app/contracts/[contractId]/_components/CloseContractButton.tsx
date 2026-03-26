'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { closeContract } from '@/lib/api/contracts';
import type { MilestoneResponse, MilestoneStatus } from '@/lib/types/contract';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FiLock } from 'react-icons/fi';

const ACTIVE_STATUSES: MilestoneStatus[] = ['PENDING', 'NOT_FUNDED', 'IN_PROGRESS', 'UNDER_REVIEW'];

interface CloseContractButtonProps {
  contractId: string;
  milestones: MilestoneResponse[];
}

export function CloseContractButton({ contractId, milestones }: CloseContractButtonProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const hasActiveMilestones = milestones.some((m) => ACTIVE_STATUSES.includes(m.status));

  const { mutate, isPending } = useMutation({
    mutationFn: () => closeContract(contractId),
    onSuccess: () => {
      toast.success('Contract closed successfully.');
      queryClient.invalidateQueries({ queryKey: ['contract', contractId] });
      setOpen(false);
    },
    onError: (err: Error) => {
      toast.error(err.message || 'Failed to close contract.');
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          disabled={hasActiveMilestones}
          title={
            hasActiveMilestones
              ? 'All milestones must be completed or rejected before closing'
              : undefined
          }
        >
          <FiLock className="w-4 h-4 mr-2" />
          Close Contract
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Close this contract?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently close the contract. Once closed, no new milestones can be added
            and both parties will be able to leave feedback.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()} disabled={isPending}>
            {isPending ? 'Closing…' : 'Close Contract'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
