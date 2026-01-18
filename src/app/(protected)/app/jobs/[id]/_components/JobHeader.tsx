import { Badge } from '@/components/ui/badge';
import { FiDollarSign, FiCalendar, FiUsers } from 'react-icons/fi';

interface JobHeaderProps {
  title: string;
  jobStatus: string;
  jobPrice: number;
  experienceLevel: string;
  createdAt: string;
}

export function JobHeader({
  title,
  jobStatus,
  jobPrice,
  experienceLevel,
  createdAt,
}: JobHeaderProps) {
  const formatExperienceLevel = (level: string) => {
    const formatted = level.replace('_', ' ').toLowerCase();
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
          <div className="flex items-center gap-2">
            <Badge
              variant={jobStatus === 'OPEN' ? 'default' : 'outline'}
              className={
                jobStatus === 'OPEN' ? 'bg-green-500 hover:bg-green-600' : ''
              }
            >
              {jobStatus}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <FiDollarSign className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Budget:</span>
          <span className="font-semibold text-lg">
            ${jobPrice.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Experience:</span>
          <span className="font-semibold">
            {formatExperienceLevel(experienceLevel)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">Posted:</span>
          <span className="font-semibold">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
}
