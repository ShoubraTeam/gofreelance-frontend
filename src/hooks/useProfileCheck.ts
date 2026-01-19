import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/useAuthStore';
import { getProfiles } from '@/lib/api/profile';

export function useProfileCheck() {
  const { user, isAuthenticated } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
    enabled: isAuthenticated,
    retry: 1,
  });

  const profiles = data?.data || [];
  const hasProfile = profiles.length > 0;

  // Check if the account is a client or freelancer
  const isClient = user?.client === true;
  const isFreelancer = user?.freelancer === true;

  // Check if client/freelancer profiles exist
  const hasClientProfile = profiles.some(p => p.profileType === 'CLIENT');
  const hasFreelancerProfile = profiles.some(p => p.profileType === 'FREELANCER');

  // Determine which type of profile the user should create based on account type
  const needsClientProfile = isClient && !hasClientProfile;
  const needsFreelancerProfile = isFreelancer && !hasFreelancerProfile;

  return {
    profiles,
    hasProfile,
    hasClientProfile,
    needsClientProfile,
    needsFreelancerProfile,
    isLoading,
    error,
  };
}
