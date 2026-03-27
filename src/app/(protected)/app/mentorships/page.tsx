'use client';

import { useState } from 'react';
import { useProfileCheck } from '@/hooks/useProfileCheck';
import { BrowseMentorships } from './_components/BrowseMentorships';
import { MyMentorships } from './_components/MyMentorships';
import { MentorshipTabs } from './_components/MentorshipTabs';
import { Loader2 } from 'lucide-react';

type Tab = 'browse' | 'mine';

export default function MentorshipsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('browse');
  const { profiles, isLoading } = useProfileCheck();

  const freelancerProfile = profiles.find((p) => p.profileType === 'FREELANCER');

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Mentorships</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Find a mentor to accelerate your growth, or share your expertise as a mentor.
          </p>

          <MentorshipTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && activeTab === 'browse' && <BrowseMentorships />}

        {!isLoading && activeTab === 'mine' && freelancerProfile && (
          <MyMentorships freelancerProfileId={freelancerProfile.id} />
        )}

        {!isLoading && activeTab === 'mine' && !freelancerProfile && (
          <div className="text-center py-20 text-muted-foreground">
            You need a freelancer profile to post or manage mentorships.
          </div>
        )}
      </div>
    </div>
  );
}
