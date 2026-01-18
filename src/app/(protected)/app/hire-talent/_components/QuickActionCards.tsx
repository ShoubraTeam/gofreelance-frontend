'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  FiPlus,
  FiBriefcase,
  FiUsers,
} from 'react-icons/fi';
import type { JobResponse } from '@/lib/types/job';

interface QuickActionCardsProps {
  jobs: JobResponse[];
  onCreateJob: () => void;
}

export function QuickActionCards({ jobs, onCreateJob }: QuickActionCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card
        className="border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
        onClick={onCreateJob}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiPlus className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Post a New Job</h3>
              <p className="text-sm text-muted-foreground">
                Create a job posting to find the perfect freelancer
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiBriefcase className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">
                {jobs.filter(j => j.jobStatus === 'OPEN').length} Active Jobs
              </h3>
              <p className="text-sm text-muted-foreground">Currently open for proposals</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <FiUsers className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Browse Talent</h3>
              <p className="text-sm text-muted-foreground">Search for freelancers by skills</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
