'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiDollarSign, FiUsers, FiCalendar, FiPlus } from 'react-icons/fi';
import type { JobResponse } from '@/lib/types/job';
import { capitalize } from '@/lib/utils';

interface JobCardProps {
  job: JobResponse;
  onEditJob: (job: JobResponse) => void;
}

function JobCard({ job, onEditJob }: JobCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-foreground">
                {job.title}
              </h3>
              <Badge
                variant={job.jobStatus === 'OPEN' ? 'default' : 'outline'}
                className={job.jobStatus === 'OPEN' ? 'bg-green-500 hover:bg-green-600' : ''}
              >
                {job.jobStatus}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
              {job.content}
            </p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-semibold">${job.jobPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Experience:</span>
                <span className="font-semibold">{capitalize(job.experienceLevel)}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Proposals:</span>
                <span className="font-semibold">{job.proposalCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Posted:</span>
                <span className="font-semibold">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 flex items-center justify-end">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/app/hire-talent/${job.id}/proposals`)}
            >
              <FiUsers className="w-4 h-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEditJob(job)}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface JobListProps {
  jobs: JobResponse[];
  onCreateJob: () => void;
  onEditJob: (job: JobResponse) => void;
}

export function JobList({ jobs, onCreateJob, onEditJob }: JobListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">All Job Postings</h2>
        <Button onClick={onCreateJob}>
          <FiPlus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onEditJob={onEditJob} />
      ))}
    </div>
  );
}
