'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getJobById } from '@/lib/api/jobs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { FiArrowLeft } from 'react-icons/fi';
import { MentorshipHeader } from './_components/MentorshipHeader';
import { ApplicationSection } from './_components/ApplicationSection';

export default function MentorshipDetailPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: jobData, isLoading } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const mentorship = jobData?.data;

  if (!mentorship) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Mentorship not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button variant="ghost" size="sm" className="mb-4 -ml-2" onClick={() => router.push('/app/mentorships')}>
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Mentorships
        </Button>

        <Card>
          <CardContent className="p-8">
            <MentorshipHeader
              title={mentorship.title}
              jobStatus={mentorship.jobStatus}
              experienceLevel={mentorship.experienceLevel}
              createdAt={mentorship.createdAt}
              proposalCount={mentorship.proposalCount}
            />

            <Separator className="my-6" />

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About this Mentorship</h2>
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">{mentorship.content}</p>
            </div>

            <Separator className="my-6" />

            <ApplicationSection jobId={jobId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
