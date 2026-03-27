'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPublicJobs } from '@/lib/api/jobs';
import { MentorshipCard } from './MentorshipCard';
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
import { FiBook } from 'react-icons/fi';

export function BrowseMentorships() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['public-mentorships', page],
    queryFn: () => getPublicJobs(page, 'MENTORSHIP'),
  });

  const pagedData = data?.data;
  const mentorships = pagedData?.content ?? [];
  const totalPages = pagedData?.totalPages ?? 1;
  const isFirstPage = pagedData?.first ?? true;
  const isLastPage = pagedData?.last ?? true;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (mentorships.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
        <FiBook className="w-10 h-10" />
        <p>No mentorships available at the moment. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {mentorships.map((m) => (
        <MentorshipCard key={m.id} mentorship={m} />
      ))}

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => !isFirstPage && setPage((p) => p - 1)}
                  className={isFirstPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (page < 3) {
                  pageNum = i;
                } else if (page > totalPages - 3) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setPage(pageNum)}
                      isActive={page === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum + 1}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && page < totalPages - 3 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => setPage(totalPages - 1)} className="cursor-pointer">
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => !isLastPage && setPage((p) => p + 1)}
                  className={isLastPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
