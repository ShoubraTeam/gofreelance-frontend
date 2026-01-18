'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAccountInfo } from '@/lib/api/auth';
import { getProfiles } from '@/lib/api/profile';
import { Loader2 } from 'lucide-react';
import { ProfilePageHeader } from './_components/ProfilePageHeader';
import { ProfileSidebar } from './_components/ProfileSidebar';
import { ProfileMainContent } from './_components/ProfileMainContent';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';

export default function ProfilePage() {
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const { user } = useAuthStore();
  const {
    data: accountData,
    isLoading: isLoadingAccount,
    error: accountError,
  } = useQuery({
    queryKey: ['account', 'info'],
    queryFn: getAccountInfo,
  });

  const {
    data: profilesData,
    isLoading: isLoadingProfiles,
    error: profilesError,
  } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles,
  });

  const profiles = useMemo(() => profilesData?.data || [], [profilesData?.data]);

  // Initialize selected profile when profiles are loaded - this is intentional
  useEffect(() => {
    if (!selectedProfileId && profiles.length > 0 && user) {
      const isFreelancer = user.currentType === UserType.FREELANCER;
      const currentTypeProfiles = profiles.filter(
        (p) => p.profileType === (isFreelancer ? 'FREELANCER' : 'CLIENT')
      );
      if (currentTypeProfiles.length > 0) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedProfileId(currentTypeProfiles[0].id);
      }
    }
  }, [profiles.length, selectedProfileId, user]);

  if (isLoadingAccount || isLoadingProfiles) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (accountError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg">
          Failed to load account information. Please try again later.
        </div>
      </div>
    );
  }

  const account = accountData?.data;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 pb-12 pt-20">
        {account && <ProfilePageHeader account={account} />}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <ProfileSidebar
              profiles={profiles}
              selectedProfileId={selectedProfileId}
              onProfileSelect={setSelectedProfileId}
            />
          </div>

          <div className="lg:col-span-8">
            {!profilesError && (
              <ProfileMainContent
                profiles={profiles}
                selectedProfileId={selectedProfileId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
