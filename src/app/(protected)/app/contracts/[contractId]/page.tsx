'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { getContractById, getContractMilestones } from '@/lib/api/contracts';
import { UserType } from '@/lib/types/auth';
import { capitalize } from '@/lib/utils';
import { CONTRACT_STATUS_STYLES, shortContractId } from '../_components/contract-status';
import { MilestoneCard } from './_components/MilestoneCard';
import { AddMilestoneForm } from './_components/AddMilestoneForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';

interface PageProps {
  params: Promise<{ contractId: string }>;
}

export default function ContractDetailPage({ params }: PageProps) {
  const { contractId } = use(params);
  const router = useRouter();
  const { user } = useAuthStore();
  const isClient = user?.currentType === UserType.CLIENT;

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
          Back to Contracts
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && contract && (
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Contract #{shortContractId(contract.contractId)}
                </h1>
                <p className="text-xs text-muted-foreground mt-1">{contract.contractId}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <FiCalendar className="w-4 h-4 text-primary" />
                  <span>Created {new Date(contract.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <Badge className={CONTRACT_STATUS_STYLES[contract.contractStatus]}>
                {capitalize(contract.contractStatus)}
              </Badge>
            </div>

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
                  isFreelancer={!isClient}
                />
              ))}
            </div>

            {isClient && contract.contractStatus === 'OPENED' && (
              <AddMilestoneForm contractId={contractId} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
