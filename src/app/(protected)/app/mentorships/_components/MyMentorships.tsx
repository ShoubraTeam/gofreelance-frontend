'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFreelancerJobs } from '@/lib/api/jobs';
import { Button } from '@/components/ui/button';
import { MentorshipCreationForm } from './MentorshipCreationForm';
import { MentorshipListCard } from './MentorshipListCard';
import { Loader2 } from 'lucide-react';
import { FiBook, FiPlus } from 'react-icons/fi';
import type { JobResponse } from '@/lib/types/job';

interface MyMentorshipsProps {
  freelancerProfileId: string;
}

export function MyMentorships({ freelancerProfileId }: MyMentorshipsProps) {
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['freelancer-jobs', freelancerProfileId],
    queryFn: () => getFreelancerJobs(freelancerProfileId),
    enabled: !!freelancerProfileId,
  });

  const mentorships = (data?.data ?? [])
    .filter((j: JobResponse) => j.jobType === 'MENTORSHIP')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!showForm && (
        <div className="flex justify-end">
          <Button onClick={() => setShowForm(true)}>
            <FiPlus className="w-4 h-4 mr-2" />
            Post Mentorship
          </Button>
        </div>
      )}

      {showForm && (
        <MentorshipCreationForm
          freelancerProfileId={freelancerProfileId}
          onCancel={() => setShowForm(false)}
        />
      )}

      {mentorships.length === 0 && !showForm && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
          <FiBook className="w-10 h-10" />
          <p>You haven&apos;t posted any mentorships yet.</p>
          <Button variant="outline" onClick={() => setShowForm(true)}>
            Post your first mentorship
          </Button>
        </div>
      )}

      {mentorships.map((m) => (
        <MentorshipListCard key={m.id} mentorship={m} />
      ))}
    </div>
  );
}
