'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiDollarSign, FiUsers, FiCalendar, FiPlus } from 'react-icons/fi';
import type { JobResponse } from '@/lib/types/job';

interface JobListProps {
  jobs: JobResponse[];
  onCreateJob: () => void;
  onEditJob: (job: JobResponse) => void;
}

export function JobList({ jobs, onCreateJob, onEditJob }: JobListProps) {
  const formatExperienceLevel = (level: string) => {
    const formatted = level.replace('_', ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

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
        <Card key={job.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">
                    {job.title}
                  </h3>
                  <Badge
                    variant={job.jobStatus === 'OPEN' ? 'default' : 'outline'}
                    className={
                      job.jobStatus === 'OPEN'
                        ? 'bg-green-500 hover:bg-green-600'
                        : ''
                    }
                  >
                    {job.jobStatus}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-4">{job.content}</p>

                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <FiDollarSign className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Budget:</span>
                    <span className="font-semibold">
                      ${job.jobPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Experience:</span>
                    <span className="font-semibold">
                      {formatExperienceLevel(job.experienceLevel)}
                    </span>
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

            <div className="border-t pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FiUsers className="w-4 h-4" />
                <span>0 proposals received</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FiUsers className="w-4 h-4 mr-2" />
                  View Proposals
                </Button>
                <Button variant="outline" size="sm" onClick={() => onEditJob(job)}>
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  {job.jobStatus === 'CLOSED' ? 'Reopen' : 'Close'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
