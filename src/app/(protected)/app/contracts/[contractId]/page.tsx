'use client';

import { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileCheck } from '@/hooks/useProfileCheck';
import { getContractById, getContractMilestones } from '@/lib/api/contracts';
import { UserType } from '@/lib/types/auth';
import { ContractHeader } from './_components/ContractHeader';
import { MilestoneCard } from './_components/MilestoneCard';
import { AddMilestoneForm } from './_components/AddMilestoneForm';
import { FeedbackForm } from './_components/FeedbackForm';
import { CreateDisputeDialog } from './_components/CreateDisputeDialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiArrowLeft } from 'react-icons/fi';

interface PageProps {
  params: Promise<{ contractId: string }>;
}

export default function ContractDetailPage({ params }: PageProps) {
  const { contractId } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMentorship = searchParams.get('jobType') === 'MENTORSHIP';

  const { user } = useAuthStore();
  const { profiles } = useProfileCheck();
  const isClient = user?.currentType === UserType.CLIENT;

  const freelancerProfile = profiles.find((p) => p.profileType === 'FREELANCER');

  const { data: contractData, isLoading: isLoadingContract } = useQuery({
    queryKey: ['contract', contractId],
    queryFn: () => getContractById(contractId),
  });

  const { data: milestonesData, isLoading: isLoadingMilestones } = useQuery({
    queryKey: ['milestones', contractId],
    queryFn: () => getContractMilestones(contractId),
  });

  const contract = contractData?.data;
  const milestones = milestonesData?.data ?? [];
  const isLoading = isLoadingContract || isLoadingMilestones;
  const [disputeOpen, setDisputeOpen] = useState(false);

  const isMentor = isMentorship && !!freelancerProfile && contract?.authorId === freelancerProfile.id;
  const isOwner = isClient || isMentor;
  const isWorker = !isOwner;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2"
          onClick={() => router.push('/app/contracts')}
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          {isMentorship ? 'Back to Mentorship Contracts' : 'Back to Contracts'}
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && contract && (
          <div className="space-y-6">
            <ContractHeader
              contract={contract}
              milestones={milestones}
              isMentorship={isMentorship}
              isOwner={isOwner}
              onOpenDispute={() => setDisputeOpen(true)}
            />

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                Milestones
                {milestones.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({milestones.length})
                  </span>
                )}
              </h2>

              {milestones.length === 0 && (
                <p className="text-sm text-muted-foreground py-4">No milestones yet.</p>
              )}

              {milestones.map((milestone) => (
                <MilestoneCard
                  key={milestone.id}
                  milestone={milestone}
                  contractId={contractId}
                  isFreelancer={isWorker}
                  isMentorship={isMentorship}
                />
              ))}
            </div>

            {isOwner && contract.contractStatus === 'OPEN' && (
              <AddMilestoneForm contractId={contractId} isMentorship={isMentorship} />
            )}

            {contract.contractStatus === 'CLOSED' && (
              <FeedbackForm contractId={contractId} isRated={contract.rated} />
            )}
          </div>
        )}

        {!isMentorship && (
          <CreateDisputeDialog
            contractId={contractId}
            open={disputeOpen}
            onOpenChange={setDisputeOpen}
          />
        )}
      </div>
    </div>
  );
}
