interface JobListHeaderProps {
  jobCount: number;
  isLoading: boolean;
}

export function JobListHeader({ jobCount, isLoading }: JobListHeaderProps): React.ReactElement {
  return (
    <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            Available Jobs
            {!isLoading && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {jobCount} jobs
              </span>
            )}
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse through the latest opportunities
          </p>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          <select className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-white text-foreground text-sm font-medium cursor-pointer hover:bg-muted/50 transition-colors">
            <option>Most Recent</option>
            <option>Highest Budget</option>
            <option>Lowest Budget</option>
            <option>Most Proposals</option>
          </select>
        </div>
      </div>
    </div>
  );
}
