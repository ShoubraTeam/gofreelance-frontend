'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getJobProposals, getJobById } from '@/lib/api/jobs';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiArrowLeft, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { ApplicationCard } from './_components/ApplicationCard';

const PAGE_SIZE = 10;

export default function MentorshipApplicationsPage() {
  const { id: jobId } = useParams<{ id: string }>();
  const router = useRouter();
  const [page, setPage] = useState(0);

  const { data: jobData } = useQuery({
    queryKey: ['job', jobId],
    queryFn: () => getJobById(jobId),
  });

  const { data, isLoading } = useQuery({
    queryKey: ['job-proposals', jobId, page],
    queryFn: () => getJobProposals(jobId, page, PAGE_SIZE),
  });

  const mentorship = jobData?.data;
  const applications = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 0;
  const totalElements = data?.data?.totalElements ?? 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2"
            onClick={() => router.push('/app/mentorships')}
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to My Mentorships
          </Button>

          <h1 className="text-2xl font-bold text-foreground">
            {mentorship ? `Applications for "${mentorship.title}"` : 'Applications'}
          </h1>
          {!isLoading && (
            <p className="mt-1 text-sm text-muted-foreground">
              {totalElements} application{totalElements !== 1 ? 's' : ''} received
            </p>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && applications.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No applications have been submitted yet.
          </div>
        )}

        {!isLoading && applications.length > 0 && (
          <div className="space-y-4">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                mentorshipTitle={mentorship?.title ?? ''}
              />
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <span className="text-sm text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                    <FiChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
