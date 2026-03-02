'use client';

import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getClientProfileDetails } from '@/lib/api/profile';
import { PageLoader } from '@/components/PageLoader';
import { ProfileNotFound } from '@/components/ProfileNotFound';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FiStar, FiBriefcase, FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PublicClientProfilePage({ params }: PageProps) {
  const { id: profileId } = use(params);
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['public-profile-client', profileId],
    queryFn: () => getClientProfileDetails(profileId),
  });

  const client = data?.data;

  if (isLoading) return <PageLoader />;
  if (!client) return <ProfileNotFound />;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2 hover:bg-primary/10 hover:text-primary"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>

        <Card className="bg-white border border-border rounded-xl shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-3xl sm:text-4xl shadow-lg ring-4 ring-white shrink-0">
              {client.companyName?.[0] ?? '?'}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <FiBriefcase className="w-5 h-5 text-primary" />
                <h1 className="text-2xl sm:text-3xl font-bold">{client.companyName}</h1>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-1 text-sm text-muted-foreground mt-2">
                <FiStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-foreground">
                  {client.averageRatings.toFixed(1)}
                </span>
                <span>({client.numberOfRatings} reviews)</span>
              </div>
            </div>
          </div>

          {client.bio && (
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-foreground leading-relaxed">{client.bio}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
