'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyDisputes } from '@/lib/api/disputes';
import { DisputeCard } from './_components/DisputeCard';
import { DisputePagination } from './_components/DisputePagination';
import { Loader2 } from 'lucide-react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DisputesPage() {
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['disputes', page],
    queryFn: () => getMyDisputes(page),
  });

  const disputes = data?.data.content ?? [];
  const totalPages = data?.data.totalPages ?? 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <FiAlertTriangle className="w-5 h-5 text-destructive" />
          <h1 className="text-2xl font-bold">My Disputes</h1>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && disputes.length === 0 && (
          <p className="text-sm text-muted-foreground py-10 text-center">No disputes found.</p>
        )}

        {!isLoading && disputes.length > 0 && (
          <div className="space-y-3">
            {disputes.map((dispute) => (
              <DisputeCard key={dispute.id} dispute={dispute} />
            ))}
          </div>
        )}

        <DisputePagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
}
