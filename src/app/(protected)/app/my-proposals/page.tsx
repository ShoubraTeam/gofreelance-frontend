'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { getMyProposals } from '@/lib/api/proposals';
import { MyProposalRow } from './_components/MyProposalRow';
import type { ProposalStatus } from '@/lib/types/proposal';

type StatusFilter = 'ALL' | ProposalStatus;

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'REJECTED', label: 'Rejected' },
];

export default function MyProposalsPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  const { data, isLoading } = useQuery({
    queryKey: ['my-proposals'],
    queryFn: getMyProposals,
  });

  const proposals = data?.data ?? [];
  const filteredProposals =
    statusFilter === 'ALL'
      ? proposals
      : proposals.filter((p) => p.status === statusFilter);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground">My Proposals</h1>
          <p className="text-muted-foreground mt-1">
            Track every proposal you&apos;ve submitted, including rejected ones
          </p>
        </div>

        <div className="inline-flex items-center gap-1 rounded-md border border-border p-0.5 text-sm mb-6 bg-white">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                statusFilter === filter.value
                  ? 'bg-muted font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredProposals.length === 0 ? (
          <div className="bg-white border border-border rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              {statusFilter === 'ALL'
                ? "You haven't submitted any proposals yet."
                : `No ${statusFilter.toLowerCase()} proposals.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <MyProposalRow key={proposal.id} proposal={proposal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
