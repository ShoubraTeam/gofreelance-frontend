'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { FiDollarSign, FiClock, FiCalendar } from 'react-icons/fi';
import { getJobById } from '@/lib/api/jobs';
import { RejectionReasonButton } from '@/components/RejectionReasonButton';
import { STATUS_COLORS } from '@/lib/constants/statusStyles';
import type { ProposalResponse, ProposalStatus } from '@/lib/types/proposal';

const STATUS_STYLES: Record<ProposalStatus, string> = {
  PENDING: STATUS_COLORS.pending,
  ACCEPTED: STATUS_COLORS.success,
  REJECTED: STATUS_COLORS.rejected,
};

interface MyProposalRowProps {
  proposal: ProposalResponse;
}

export function MyProposalRow({ proposal }: MyProposalRowProps) {
  const { data: jobData, isLoading } = useQuery({
    queryKey: ['job', proposal.jobId],
    queryFn: () => getJobById(proposal.jobId),
  });

  const job = jobData?.data;
  const statusLabel = proposal.status.charAt(0) + proposal.status.slice(1).toLowerCase();

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          ) : (
            <Link
              href={`/app/jobs/${proposal.jobId}`}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {job?.title ?? 'Job no longer available'}
            </Link>
          )}
          <Badge className={STATUS_STYLES[proposal.status]}>{statusLabel}</Badge>
        </div>

        <p className="text-sm text-foreground leading-relaxed line-clamp-2">
          {proposal.content}
        </p>

        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t pt-4">
          {proposal.totalPrice != null && (
            <div className="flex items-center gap-1.5">
              <FiDollarSign className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">
                ${proposal.totalPrice.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4 text-primary" />
            <span>{proposal.totalTimeHours}h estimated</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 text-primary" />
            <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
          </div>

          {proposal.status === 'REJECTED' && (
            <div className="ml-auto">
              <RejectionReasonButton proposalId={proposal.id} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
