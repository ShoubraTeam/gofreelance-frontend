'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPublicJobs } from '@/lib/api/jobs';
import { JobCard } from './_components/JobCard';
import { SearchFilters } from './_components/SearchFilters';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Loader2 } from 'lucide-react';

export default function FindWorkPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  const { data: jobsData, isLoading } = useQuery({
    queryKey: ['public-jobs', currentPage],
    queryFn: () => getPublicJobs(currentPage),
  });

  interface PagedResponse {
    content: Array<{
      id: string;
      title: string;
      content: string;
      jobPrice: number;
      createdAt: string;
      experienceLevel: string;
    }>;
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    number: number;
  }

  const pagedData = (jobsData?.data as unknown as PagedResponse);
  const apiJobs = pagedData?.content || [];
  const totalPages = pagedData?.totalPages || 1;
  const isFirstPage = pagedData?.first ?? true;
  const isLastPage = pagedData?.last ?? true;

  // Map API jobs to JobCard format
  const jobs = apiJobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.content,
    budget: job.jobPrice,
    budgetType: 'fixed' as const,
    skills: [],
    postedAt: new Date(job.createdAt).toLocaleDateString(),
    proposals: 0,
  }));

  return (
    <div className="min-h-screen bg-muted/30">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 py-4 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    Available Jobs
                    {!isLoading && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {jobs.length} jobs
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

            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white border border-border rounded-xl p-12 text-center">
                  <p className="text-muted-foreground">No jobs available at the moment. Check back later!</p>
                </div>
              ) : (
                jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => !isFirstPage && setCurrentPage(currentPage - 1)}
                        className={isFirstPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage < 3) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 3) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            onClick={() => setCurrentPage(pageNum)}
                            isActive={currentPage === pageNum}
                            className="cursor-pointer"
                          >
                            {pageNum + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 3 && (
                      <>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => setCurrentPage(totalPages - 1)}
                            className="cursor-pointer"
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => !isLastPage && setCurrentPage(currentPage + 1)}
                        className={isLastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>

          <aside className="lg:col-span-1">
            <SearchFilters
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
