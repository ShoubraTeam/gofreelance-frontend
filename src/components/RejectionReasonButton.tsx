'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getProposalRejectionReason } from '@/lib/api/proposals';
import { getApiErrorCode } from '@/lib/utils';
import { MarkdownContent } from '@/components/MarkdownContent';

interface RejectionReasonButtonProps {
  proposalId: string;
}

export function RejectionReasonButton({ proposalId }: RejectionReasonButtonProps) {
  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const { mutate: fetchRejectionReason, isPending: isLoadingReason } = useMutation({
    mutationFn: () => getProposalRejectionReason(proposalId),
    onSuccess: (response) => {
      setReport(response.data.report);
      setOpen(true);
    },
    onError: (error: unknown) => {
      const code = getApiErrorCode(error);
      if (code === 'ERR_PROPOSAL_NOT_REJECTED') {
        toast.error('This proposal is not rejected.');
      } else {
        toast.error('Unable to load rejection reason, try again.');
      }
    },
  });

  return (
    <>
      <Button
        onClick={() => fetchRejectionReason()}
        variant="outline"
        disabled={isLoadingReason}
      >
        {isLoadingReason ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          'View Rejection Reason'
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rejection Reason</DialogTitle>
          </DialogHeader>
          {report && <MarkdownContent content={report} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
