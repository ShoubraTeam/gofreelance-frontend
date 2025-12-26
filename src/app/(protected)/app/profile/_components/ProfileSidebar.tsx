'use client';

import { useQueries } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import type { GetProfileResponse } from '@/lib/types/profile';
import { getFreelancerProfileDetails, getClientProfileDetails } from '@/lib/api/profile';
import { HiPlus } from 'react-icons/hi';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { useRouter } from 'next/navigation';

interface ProfileSidebarProps {
  profiles: GetProfileResponse[];
  selectedProfileId: string | null;
  onProfileSelect: (profileId: string) => void;
}

export function ProfileSidebar({ profiles, selectedProfileId, onProfileSelect }: ProfileSidebarProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const freelancerProfiles = profiles.filter(
    (p) => p.profileType === 'FREELANCER'
  );

  const clientProfiles = profiles.filter((p) => p.profileType === 'CLIENT');

  const currentProfiles = user?.currentType === UserType.FREELANCER
    ? freelancerProfiles
    : clientProfiles;

  const isFreelancer = user?.currentType === UserType.FREELANCER;

  const profileDetailsQueries = useQueries({
    queries: currentProfiles.map((profile) => ({
      queryKey: ['profile-details', profile.id],
      queryFn: () =>
        isFreelancer
          ? getFreelancerProfileDetails(profile.id)
          : getClientProfileDetails(profile.id),
      enabled: currentProfiles.length > 0,
    })),
  });

  const selectedProfileIndex = currentProfiles.findIndex(
    (p) => p.id === selectedProfileId
  );
  const activeIndex = selectedProfileIndex >= 0 ? selectedProfileIndex : 0;
  const selectedProfileDetails = profileDetailsQueries[activeIndex]?.data?.data;

  const totalEarnings = 0;
  const totalJobs = 0;

  const specialization = isFreelancer && selectedProfileDetails
    ? (selectedProfileDetails as any)?.specialization?.type
    : null;

  const handleCreateProfile = (profileType: 'freelancer' | 'client') => {
    router.push(`/app/profile/create/${profileType}`);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-white border border-border rounded-md shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-left">View profile</h2>
            <button
              onClick={() => {
                const profileType = user?.currentType === UserType.FREELANCER ? 'freelancer' : 'client';
                handleCreateProfile(profileType);
              }}
              className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
              title={`Create New ${user?.currentType === UserType.FREELANCER ? 'Freelancer' : 'Client'} Profile`}
            >
              <HiPlus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {currentProfiles.length > 0 ? (
              currentProfiles.map((profile, index) => {
                const detailsQuery = profileDetailsQueries[index];
                const details = detailsQuery?.data?.data;
                const isSelected = selectedProfileId === profile.id;

                const displayTitle = isFreelancer
                  ? (details as any)?.title || 'Loading...'
                  : (details as any)?.companyName || 'Loading...';

                return (
                  <div
                    key={profile.id}
                    onClick={() => onProfileSelect(profile.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border cursor-pointer hover:bg-primary/15 transition-colors ${
                      isSelected
                        ? 'bg-primary/10 border-primary/20 text-primary'
                        : 'bg-background border-border text-foreground'
                    }`}
                  >
                    <span className="text-left">{displayTitle}</span>
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 rounded-lg bg-muted/50 text-sm font-medium border border-dashed border-muted-foreground/30 text-center text-muted-foreground">
                No profiles yet. Click + to create your first profile.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {freelancerProfiles.length > 0 && specialization && (
        <Card className="bg-white border border-border rounded-md shadow-none">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 text-sm text-left">{specialization}</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-left">
                <div className="text-xl font-bold">
                  ${totalEarnings}{totalEarnings > 0 ? '+' : ''}
                </div>
                <div className="text-xs text-muted-foreground">Earnings</div>
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">{totalJobs}</div>
                <div className="text-xs text-muted-foreground">Jobs</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-white border border-border rounded-md shadow-none">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 text-sm text-left">All stats</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-left">
              <div className="text-xl font-bold">
                ${totalEarnings}{totalEarnings > 0 ? '+' : ''}
              </div>
              <div className="text-xs text-muted-foreground">
                Total earnings
              </div>
            </div>
            <div className="text-left">
              <div className="text-xl font-bold">{totalJobs}</div>
              <div className="text-xs text-muted-foreground">Total jobs</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
