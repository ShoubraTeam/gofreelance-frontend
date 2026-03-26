'use client';

import { Button } from '@/components/ui/button';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface DisputePaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DisputePagination({ page, totalPages, onPageChange }: DisputePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 0}
      >
        <FiChevronLeft className="w-4 h-4" />
      </Button>
      <span className="text-sm text-muted-foreground">
        {page + 1} / {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages - 1}
      >
        <FiChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
