'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getDisputeById } from '@/lib/api/disputes';
import { DisputeHeader } from './_components/DisputeHeader';
import { DisputeParties } from './_components/DisputeParties';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiArrowLeft } from 'react-icons/fi';

interface PageProps {
  params: Promise<{ disputeId: string }>;
}

export default function DisputeDetailPage({ params }: PageProps) {
  const { disputeId } = use(params);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['dispute', disputeId],
    queryFn: () => getDisputeById(disputeId),
  });

  const dispute = data?.data;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 -ml-2"
          onClick={() => router.push('/app/disputes')}
        >
          <FiArrowLeft className="w-4 h-4 mr-2" />
          Back to Disputes
        </Button>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isLoading && dispute && (
          <div className="space-y-6">
            <DisputeHeader dispute={dispute} />

            <Card>
              <CardContent className="p-5">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {dispute.content}
                </p>
              </CardContent>
            </Card>

            <DisputeParties dispute={dispute} />

            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/app/contracts/${dispute.contractId}`)}
            >
              View Contract
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
