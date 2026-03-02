'use client';

import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { useProfileCheck } from '@/hooks/useProfileCheck';
import { getContractsByProfileId } from '@/lib/api/contracts';
import { UserType } from '@/lib/types/auth';
import { ContractCard } from './_components/ContractCard';
import { Loader2 } from 'lucide-react';
import { FiFileText } from 'react-icons/fi';

export default function ContractsPage() {
  const { user } = useAuthStore();
  const { profiles, isLoading: isLoadingProfiles } = useProfileCheck();

  const currentType = user?.currentType;
  const profileType = currentType === UserType.CLIENT ? 'CLIENT' : 'FREELANCER';
  const currentProfile = profiles.find((p) => p.profileType === profileType);

  const { data, isLoading: isLoadingContracts } = useQuery({
    queryKey: ['contracts', currentProfile?.id],
    queryFn: () => getContractsByProfileId(currentProfile!.id),
    enabled: !!currentProfile,
  });

  const isLoading = isLoadingProfiles || (!!currentProfile && isLoadingContracts);
  const contracts = data?.data ?? [];

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">My Contracts</h1>
          {!isLoading && (
            <p className="mt-1 text-sm text-muted-foreground">
              {contracts.length} contract{contracts.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && !currentProfile && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <FiFileText className="w-10 h-10" />
            <p>No profile found for your current account type.</p>
          </div>
        )}

        {!isLoading && currentProfile && contracts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
            <FiFileText className="w-10 h-10" />
            <p>You have no contracts yet.</p>
          </div>
        )}

        {!isLoading && contracts.length > 0 && currentType && (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <ContractCard
                key={contract.contractId}
                contract={contract}
                currentType={currentType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
