'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useProfileCheck } from '@/hooks/useProfileCheck';

export function ProfileCheckGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { hasProfile, needsClientProfile, needsFreelancerProfile, isLoading } =
    useProfileCheck();

  useEffect(() => {
    if (pathname?.startsWith('/app/profile/create')) {
      return;
    }

    if (isLoading) {
      return;
    }

    if (needsClientProfile) {
      router.push('/app/profile/create/client');
    } else if (needsFreelancerProfile) {
      router.push('/app/profile/create/freelancer');
    }
  }, [
    pathname,
    hasProfile,
    needsClientProfile,
    needsFreelancerProfile,
    isLoading,
    router,
  ]);

  // Show loading state while checking profile
  if (isLoading && !pathname?.startsWith('/app/profile/create')) {
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
