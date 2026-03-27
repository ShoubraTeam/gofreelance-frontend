'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileCheck } from '@/hooks/useProfileCheck';
import { getContractsByProfileId } from '@/lib/api/contracts';
import { UserType } from '@/lib/types/auth';
import { ContractCard } from './_components/ContractCard';
import { ContractTabs } from './_components/ContractTabs';
import { Loader2 } from 'lucide-react';
import { FiFileText } from 'react-icons/fi';

type Tab = 'jobs' | 'mentorships';

export default function ContractsPage() {
  const { user } = useAuthStore();
  const { profiles, isLoading: isLoadingProfiles } = useProfileCheck();
  const [activeTab, setActiveTab] = useState<Tab>('jobs');

  const currentType = user?.currentType;
  const profileType = currentType === UserType.CLIENT ? 'CLIENT' : 'FREELANCER';
  const currentProfile = profiles.find((p) => p.profileType === profileType);

  const freelancerProfile = profiles.find((p) => p.profileType === 'FREELANCER');

  const { data: jobContractsData, isLoading: isLoadingJobContracts } = useQuery({
    queryKey: ['contracts', currentProfile?.id, 'JOB'],
    queryFn: () => getContractsByProfileId(currentProfile!.id, 'JOB'),
    enabled: !!currentProfile && activeTab === 'jobs',
  });

  const { data: mentorshipContractsData, isLoading: isLoadingMentorshipContracts } = useQuery({
    queryKey: ['contracts', freelancerProfile?.id, 'MENTORSHIP'],
    queryFn: () => getContractsByProfileId(freelancerProfile!.id, 'MENTORSHIP'),
    enabled: !!freelancerProfile && activeTab === 'mentorships',
  });

  const isLoading =
    isLoadingProfiles ||
    (activeTab === 'jobs' && !!currentProfile && isLoadingJobContracts) ||
    (activeTab === 'mentorships' && !!freelancerProfile && isLoadingMentorshipContracts);

  const jobContracts = (jobContractsData?.data ?? []).slice().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const mentorshipContracts = (mentorshipContractsData?.data ?? []).slice().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const activeContracts = activeTab === 'jobs' ? jobContracts : mentorshipContracts;
  const activeProfile = activeTab === 'jobs' ? currentProfile : freelancerProfile;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Contracts</h1>

          <ContractTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {!isLoading && (
            <p className="mt-3 text-sm text-muted-foreground">
              {activeContracts.length} contract{activeContracts.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && !activeProfile && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <FiFileText className="w-10 h-10" />
            <p>No profile found for your current account type.</p>
          </div>
        )}

        {!isLoading && activeProfile && activeContracts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <FiFileText className="w-10 h-10" />
            <p>
              {activeTab === 'jobs'
                ? 'You have no job contracts yet.'
                : 'You have no mentorship contracts yet.'}
            </p>
          </div>
        )}

        {!isLoading && activeContracts.length > 0 && currentType && (
          <div className="space-y-4">
            {activeContracts.map((contract) => (
              <ContractCard
                key={contract.contractId}
                contract={contract}
                currentType={currentType}
                isMentorship={activeTab === 'mentorships'}
                isMentor={activeTab === 'mentorships' && contract.authorId === freelancerProfile?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
