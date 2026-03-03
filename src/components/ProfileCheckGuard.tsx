'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useProfileCheck } from '@/hooks/useProfileCheck';

const ALLOWED_PATHS_UNVERIFIED = [
  '/app/identity-verification',
];

export function ProfileCheckGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    hasProfile,
    needsClientProfile,
    needsFreelancerProfile,
    isIdentityVerified,
    isLoading,
    hasData,
  } = useProfileCheck();

  const isAllowedPath = ALLOWED_PATHS_UNVERIFIED.some(path => pathname?.startsWith(path));

  useEffect(() => {
    if (isLoading || !hasData) {
      return;
    }

    if (!isIdentityVerified) {
      if (!isAllowedPath) {
        router.push('/app/identity-verification');
      }
      return;
    }

    if (needsClientProfile) {
      router.push('/app/profile/create/client');
      return;
    }

    if (needsFreelancerProfile) {
      router.push('/app/profile/create/freelancer');
      return;
    }

    if (isAllowedPath) {
      router.push('/app/profile');
      return;
    }
  }, [
    pathname,
    hasProfile,
    needsClientProfile,
    needsFreelancerProfile,
    isIdentityVerified,
    isAllowedPath,
    isLoading,
    hasData,
    router,
  ]);

  if (isLoading && !isAllowedPath) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
