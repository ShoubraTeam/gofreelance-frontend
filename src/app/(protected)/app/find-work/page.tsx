'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPublicJobs } from '@/lib/api/jobs';
import { JobCard } from './_components/JobCard';
import { SearchFilters } from './_components/SearchFilters';
import { FindWorkHero } from './_components/FindWorkHero';
import { JobListHeader } from './_components/JobListHeader';
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
    queryFn: () => getPublicJobs(currentPage, 'JOB'),
  });

  const pagedData = jobsData?.data;
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
    skills: (job.tags ?? []).slice(0, 4),
    postedAt: new Date(job.createdAt).toLocaleDateString(),
    proposals: job.proposalCount,
  }));

  return (
    <div className="min-h-screen bg-muted/30">
      <FindWorkHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3 space-y-6">
            <JobListHeader jobCount={jobs.length} isLoading={isLoading} />

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
