'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FiUsers } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import type { JobResponse } from '@/lib/types/job';

const LEVEL_LABELS: Record<string, string> = {
  JUNIOR: 'Junior',
  MID_LEVEL: 'Mid Level',
  SENIOR: 'Senior',
  EXPERT: 'Expert',
  ANY: 'Any Level',
};

interface MentorshipListCardProps {
  mentorship: JobResponse;
}

export function MentorshipListCard({ mentorship }: MentorshipListCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <p className="font-semibold text-foreground">{mentorship.title}</p>
          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="outline">
              {LEVEL_LABELS[mentorship.experienceLevel] ?? mentorship.experienceLevel}
            </Badge>
            <Badge variant={mentorship.jobStatus === 'OPEN' ? 'default' : 'secondary'}>
              {mentorship.jobStatus === 'OPEN' ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{mentorship.content}</p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1 border-t">
          <div className="flex items-center gap-1.5">
            <FiUsers className="w-4 h-4 text-primary" />
            <span>
              {mentorship.proposalCount} applicant{mentorship.proposalCount !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/app/mentorships/${mentorship.id}/applications`)}
            >
              Review Applications
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
