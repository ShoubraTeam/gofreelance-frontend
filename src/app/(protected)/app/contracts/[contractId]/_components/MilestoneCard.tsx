'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { MilestoneResponse, MilestoneStatus } from '@/lib/types/contract';
import { STATUS_COLORS } from '@/lib/constants/statusStyles';
import { acceptMilestone, approveMilestone, fundMilestone, downloadMilestone } from '@/lib/api/contracts';
import { capitalize } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiDollarSign, FiCalendar, FiEdit2, FiUpload, FiDownload } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { EditMilestoneDialog } from './EditMilestoneDialog';
import { SubmitMilestoneDialog } from './SubmitMilestoneDialog';
import { RejectMilestoneDialog } from './RejectMilestoneDialog';

const STATUS_STYLES: Record<MilestoneStatus, string> = {
  PENDING: STATUS_COLORS.pending,
  NOT_FUNDED: STATUS_COLORS.neutral,
  IN_PROGRESS: STATUS_COLORS.info,
  UNDER_REVIEW: STATUS_COLORS.purple,
  COMPLETED: STATUS_COLORS.success,
  REJECTED: STATUS_COLORS.rejected,
};

interface MilestoneCardProps {
  milestone: MilestoneResponse;
  contractId: string;
  isFreelancer: boolean;
  isMentorship?: boolean;
}

export function MilestoneCard({ milestone, contractId, isFreelancer, isMentorship = false }: MilestoneCardProps) {
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const { mutate: accept, isPending: isAccepting } = useMutation({
    mutationFn: () => acceptMilestone(milestone.id),
    onSuccess: () => {
      toast.success('Milestone accepted.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
    },
    onError: () => toast.error('Failed to accept milestone.'),
  });

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: () => approveMilestone(milestone.id),
    onSuccess: () => {
      toast.success('Milestone approved.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
    },
    onError: () => toast.error('Failed to approve milestone.'),
  });

  const { mutate: download, isPending: isDownloading } = useMutation({
    mutationFn: () => downloadMilestone(milestone.id),
    onSuccess: (url) => window.open(url, '_blank'),
    onError: () => toast.error('Failed to download file.'),
  });

  const { mutate: fund, isPending: isFunding } = useMutation({
    mutationFn: () => fundMilestone(milestone.id),
    onSuccess: () => {
      toast.success('Milestone funded.');
      queryClient.invalidateQueries({ queryKey: ['milestones', contractId] });
    },
    onError: () => toast.error('Failed to fund milestone.'),
  });

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm text-foreground leading-relaxed flex-1">{milestone.content}</p>
          <Badge className={STATUS_STYLES[milestone.status]}>
            {capitalize(milestone.status)}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-1">
          {milestone.price != null && (
            <div className="flex items-center gap-1.5">
              <FiDollarSign className="w-4 h-4 text-primary" />
              <span className="font-semibold text-foreground">
                ${milestone.price.toLocaleString()}
              </span>
            </div>
          )}

          {milestone.startedAt && (
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-primary" />
              <span>
                {new Date(milestone.startedAt).toLocaleDateString()}
                {milestone.endedAt && ` — ${new Date(milestone.endedAt).toLocaleDateString()}`}
              </span>
            </div>
          )}

          {!milestone.startedAt && milestone.createdAt && (
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-4 h-4 text-primary" />
              <span>Created {new Date(milestone.createdAt).toLocaleDateString()}</span>
            </div>
          )}

          <div className="ml-auto flex items-center gap-2">
            {isFreelancer && milestone.status === 'PENDING' && (
              <Button size="sm" onClick={() => accept()} disabled={isAccepting}>
                {isAccepting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Accept'}
              </Button>
            )}

            {!isFreelancer && !isMentorship && milestone.status === 'NOT_FUNDED' && (
              <Button size="sm" variant="secondary" onClick={() => fund()} disabled={isFunding}>
                {isFunding ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fund'}
              </Button>
            )}

            {!isFreelancer && milestone.status === 'PENDING' && (
              <Button size="sm" variant="outline" onClick={() => setEditOpen(true)}>
                <FiEdit2 className="w-3.5 h-3.5 mr-1.5" />
                Edit
              </Button>
            )}

            {!isFreelancer && milestone.status === 'UNDER_REVIEW' && (
              <>
                <Button size="sm" variant="secondary" onClick={() => approve()} disabled={isApproving}>
                  {isApproving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Approve'}
                </Button>
                {!isMentorship && (
                  <Button size="sm" variant="destructive" onClick={() => setRejectOpen(true)}>
                    Reject
                  </Button>
                )}
              </>
            )}

            {isFreelancer && (milestone.status === 'IN_PROGRESS' || milestone.status === 'UNDER_REVIEW') && (
              <Button size="sm" onClick={() => setSubmitOpen(true)}>
                <FiUpload className="w-3.5 h-3.5 mr-1.5" />
                {milestone.status === 'UNDER_REVIEW' ? 'Resubmit' : 'Submit'}
              </Button>
            )}

            {milestone.fileName && (
              <Button size="sm" variant="outline" onClick={() => download()} disabled={isDownloading}>
                {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><FiDownload className="w-3.5 h-3.5 mr-1.5" />Download</>}
              </Button>
            )}
          </div>
        </div>
      </CardContent>

      <EditMilestoneDialog
        milestone={milestone}
        contractId={contractId}
        open={editOpen}
        onOpenChange={setEditOpen}
        isMentorship={isMentorship}
      />

      <SubmitMilestoneDialog
        milestoneId={milestone.id}
        contractId={contractId}
        open={submitOpen}
        onOpenChange={setSubmitOpen}
      />

      <RejectMilestoneDialog
        milestoneId={milestone.id}
        contractId={contractId}
        open={rejectOpen}
        onOpenChange={setRejectOpen}
      />
    </Card>
  );
}
