import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { JobResponse } from '@/lib/types/job';
import { FiCalendar, FiUsers } from 'react-icons/fi';

const LEVEL_LABELS: Record<string, string> = {
  JUNIOR: 'Junior',
  MID_LEVEL: 'Mid Level',
  SENIOR: 'Senior',
  EXPERT: 'Expert',
  ANY: 'Any Level',
};

interface MentorshipCardProps {
  mentorship: JobResponse;
}

export function MentorshipCard({ mentorship }: MentorshipCardProps) {
  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardContent className="p-6 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Link
            href={`/app/mentorships/${mentorship.id}`}
            className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
          >
            {mentorship.title}
          </Link>
          <Badge variant="outline">{LEVEL_LABELS[mentorship.experienceLevel] ?? mentorship.experienceLevel}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{mentorship.content}</p>

        <div className="flex items-center gap-5 text-sm text-muted-foreground pt-1 border-t">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 text-primary" />
            <span>{new Date(mentorship.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FiUsers className="w-4 h-4 text-primary" />
            <span>{mentorship.proposalCount} applicant{mentorship.proposalCount !== 1 ? 's' : ''}</span>
          </div>
          <div className="ml-auto">
            <Link
              href={`/app/mentorships/${mentorship.id}`}
              className="text-primary font-medium hover:underline"
            >
              View & Apply
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
