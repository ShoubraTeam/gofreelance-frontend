import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  skills: string[];
  postedAt: string;
  proposals: number;
}

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-primary/30">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <Link
            href={`/app/jobs/${job.id}`}
            className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors"
          >
            {job.title}
          </Link>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {job.postedAt}
            </span>
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              {job.proposals} proposals
            </span>
          </div>
        </div>
        <div className="ml-6 text-right">
          <div className="text-2xl font-bold text-primary">
            ${job.budget}
          </div>
          <div className="text-sm text-gray-600">
            {job.budgetType === 'fixed' ? 'Fixed Price' : 'per hour'}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-gray-200">
        <Link
          href={`/app/jobs/${job.id}`}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
