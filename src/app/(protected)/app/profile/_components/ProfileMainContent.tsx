'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { GetProfileResponse, GetFreelancerProfileDetailsResponse } from '@/lib/types/profile';
import Link from 'next/link';
import { getFreelancerProfileDetails, getClientProfileDetails } from '@/lib/api/profile';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { ProfileBioSection } from './sections/ProfileBioSection';
import { ProfileSkillsSection } from './sections/ProfileSkillsSection';
import { ProfileWorkExperienceSection } from './sections/ProfileWorkExperienceSection';
import { ProfilePortfolioSection } from './sections/ProfilePortfolioSection';
import { ProfileCertificationsSection } from './sections/ProfileCertificationsSection';

interface ProfileMainContentProps {
  profiles: GetProfileResponse[];
  selectedProfileId: string | null;
}

export function ProfileMainContent({
  profiles,
  selectedProfileId,
}: ProfileMainContentProps) {
  const { user } = useAuthStore();
  const isFreelancer = user?.currentType === UserType.FREELANCER;

  const currentProfile = selectedProfileId
    ? profiles.find((p) => p.id === selectedProfileId)
    : profiles.find((p) => p.profileType === (isFreelancer ? 'FREELANCER' : 'CLIENT'));

  const {
    data: freelancerDetailsData,
    isLoading: isLoadingFreelancer,
    refetch: refetchFreelancer,
  } = useQuery({
    queryKey: ['profile-details', currentProfile?.id],
    queryFn: () => getFreelancerProfileDetails(currentProfile!.id),
    enabled: !!currentProfile && isFreelancer,
  });

  const {
    data: clientDetailsData,
    isLoading: isLoadingClient,
    refetch: refetchClient,
  } = useQuery({
    queryKey: ['profile-details', currentProfile?.id],
    queryFn: () => getClientProfileDetails(currentProfile!.id),
    enabled: !!currentProfile && !isFreelancer,
  });

  const isLoading = isLoadingFreelancer || isLoadingClient;
  const detailsData = isFreelancer ? freelancerDetailsData : clientDetailsData;
  const refetch = isFreelancer ? refetchFreelancer : refetchClient;

  if (!currentProfile) {
    return (
      <Card className="bg-white border border-border rounded-md shadow-none">
        <CardContent className="p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No profile yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your {isFreelancer ? 'freelancer' : 'client'} profile to get started
          </p>
          <Button asChild>
            <Link href={`/app/profile/create/${isFreelancer ? 'freelancer' : 'client'}`}>
              Create Profile
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-white border border-border rounded-md shadow-none">
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground">Loading profile details...</p>
        </CardContent>
      </Card>
    );
  }

  const profile = detailsData?.data;
  if (!profile) return null;

  if (isFreelancer) {
    const freelancerProfile = profile as GetFreelancerProfileDetailsResponse;
    return (
      <div className="space-y-4">
        <ProfileBioSection profile={freelancerProfile} onUpdate={refetch} />
        <ProfileSkillsSection profile={freelancerProfile} onUpdate={refetch} />
        <ProfileWorkExperienceSection profile={freelancerProfile} onUpdate={refetch} />
        <ProfilePortfolioSection profile={freelancerProfile} onUpdate={refetch} />
        <ProfileCertificationsSection profile={freelancerProfile} onUpdate={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ProfileBioSection profile={profile} onUpdate={refetch} />
    </div>
  );
}
