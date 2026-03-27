import { Badge } from '@/components/ui/badge';
import { FiBarChart, FiCalendar, FiUsers } from 'react-icons/fi';
import { capitalize } from '@/lib/utils';

interface MentorshipHeaderProps {
  title: string;
  jobStatus: string;
  experienceLevel: string;
  createdAt: string;
  proposalCount: number;
}

export function MentorshipHeader({
  title,
  jobStatus,
  experienceLevel,
  createdAt,
  proposalCount,
}: MentorshipHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <Badge
            variant={jobStatus === 'OPEN' ? 'default' : 'outline'}
            className={jobStatus === 'OPEN' ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {jobStatus}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FiBarChart className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Level:</span>
          <span className="font-semibold">{capitalize(experienceLevel)}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Applicants:</span>
          <span className="font-semibold">{proposalCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Posted:</span>
          <span className="font-semibold">{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
