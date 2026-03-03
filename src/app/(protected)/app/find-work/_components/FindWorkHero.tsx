interface FindWorkHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function FindWorkHero({ searchQuery, onSearchChange }: FindWorkHeroProps): React.ReactElement {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary text-primary-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Find Your Next Project
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Discover opportunities that match your skills and grow your freelance career
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:bg-white/30 transition-all" />
            <div className="relative flex items-center bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="pl-5 pr-2 py-4">
                <svg
                  className="h-6 w-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for jobs by title, skills, or keywords..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="flex-1 py-4 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
