import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { getProfiles } from '@/lib/api/profile';
import { getAccountInfo } from '@/lib/api/auth';
import { UserType, type IdentityStatus } from '@/lib/types/auth';

export function useProfileCheck() {
  const { user, isAuthenticated, _hasHydrated } = useAuthStore();

  const { data: profilesData, isLoading: isLoadingProfiles, error: profilesError } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
    enabled: isAuthenticated,
    retry: 1,
  });

  const { data: accountData, isLoading: isLoadingAccount } = useQuery({
    queryKey: ['account', 'info'],
    queryFn: getAccountInfo,
    enabled: isAuthenticated,
    retry: 1,
  });

  const profiles = profilesData?.data || [];
  const hasProfile = profiles.length > 0;

  const currentType = user?.currentType;

  const hasClientProfile = profiles.some(p => p.profileType === 'CLIENT');
  const hasFreelancerProfile = profiles.some(p => p.profileType === 'FREELANCER');

  const needsClientProfile = currentType === UserType.CLIENT && !hasClientProfile;
  const needsFreelancerProfile = currentType === UserType.FREELANCER && !hasFreelancerProfile;

  const identityStatus: IdentityStatus = accountData?.data?.identityStatus || 'UNVERIFIED';
  const isIdentityVerified = identityStatus === 'VERIFIED';
  const needsIdentityVerification = identityStatus === 'UNVERIFIED' || identityStatus === 'REJECTED';

  const hasData = !isAuthenticated || (profilesData !== undefined && accountData !== undefined);

  return {
    profiles,
    hasProfile,
    hasClientProfile,
    needsClientProfile,
    needsFreelancerProfile,
    identityStatus,
    isIdentityVerified,
    needsIdentityVerification,
    isLoading: !_hasHydrated || isLoadingProfiles || isLoadingAccount,
    hasData,
    error: profilesError,
  };
}
