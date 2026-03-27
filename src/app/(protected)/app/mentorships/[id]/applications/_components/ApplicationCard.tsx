'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { ProposalResponse, ProposalStatus } from '@/lib/types/proposal';
import { STATUS_COLORS } from '@/lib/constants/statusStyles';
import { createContract } from '@/lib/api/contracts';
import { startChat } from '@/lib/api/chat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FiClock, FiCalendar, FiUser, FiStar, FiMessageSquare } from 'react-icons/fi';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const STATUS_STYLES: Record<ProposalStatus, string> = {
  PENDING: STATUS_COLORS.pending,
  ACCEPTED: STATUS_COLORS.success,
  REJECTED: STATUS_COLORS.rejected,
};

interface ApplicationCardProps {
  application: ProposalResponse;
  mentorshipTitle: string;
}

export function ApplicationCard({ application, mentorshipTitle }: ApplicationCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const statusLabel = application.status.charAt(0) + application.status.slice(1).toLowerCase();

  const { mutate: accept, isPending } = useMutation({
    mutationFn: () => createContract(application.id),
    onSuccess: (response) => {
      toast.success('Application accepted! Mentorship contract created.');
      queryClient.invalidateQueries({ queryKey: ['job-proposals'] });
      router.push(`/app/contracts/${response.data.contractId}?jobType=MENTORSHIP`);
    },
    onError: () => {
      toast.error('Failed to accept application. Please try again.');
    },
  });

  const { mutate: openChat, isPending: isStartingChat } = useMutation({
    mutationFn: () => startChat(application.id),
    onSuccess: (response) => {
      router.push(
        `/app/messages/${response.data.chatId}?other=${encodeURIComponent(application.fullName)}&job=${encodeURIComponent(mentorshipTitle)}`
      );
    },
    onError: () => {
      toast.error('Failed to open chat. Please try again.');
    },
  });

  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <button
            className="flex items-center gap-3 text-left hover:opacity-80 transition-opacity"
            onClick={() => router.push(`/profile/public/${application.freelancerProfileId}`)}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <FiUser className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{application.fullName}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <FiStar className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span>{application.averageRating.toFixed(1)}</span>
              </div>
            </div>
          </button>
          <Badge className={STATUS_STYLES[application.status]}>{statusLabel}</Badge>
        </div>

        <p className="text-sm text-foreground leading-relaxed">{application.content}</p>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4 text-primary" />
            <span>{application.totalTimeHours}h available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 text-primary" />
            <span>{new Date(application.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={() => openChat()} disabled={isStartingChat}>
              {isStartingChat ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FiMessageSquare className="w-4 h-4 mr-1.5" />
                  Message
                </>
              )}
            </Button>
            {application.status === 'PENDING' && (
              <Button size="sm" onClick={() => accept()} disabled={isPending}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Accept'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
