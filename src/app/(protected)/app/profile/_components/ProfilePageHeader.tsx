'use client';

import { Button } from '@/components/ui/button';
import type { AccountInfo } from '@/lib/types/auth';
import {
  FiCheckCircle,
  FiShare2,
  FiMapPin,
  FiSettings,
  FiEye,
} from 'react-icons/fi';
import { capitalize } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface ProfilePageHeaderProps {
  account: AccountInfo;
}

export function ProfilePageHeader({ account }: ProfilePageHeaderProps) {
  const router = useRouter();
  const { user } = useAuthStore();

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleSettings = () => {
    router.push('/app/settings');
  };

  const handleViewPublic = () => {
    const publicProfileUrl = `/profile/public/${user?.id}`;
    window.open(publicProfileUrl, '_blank');
  };

  const handleShare = async () => {
    const profileUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${account.firstName} ${account.lastName}'s Profile`,
          url: profileUrl,
        });
        toast.success('Profile shared successfully');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(profileUrl);
        }
      }
    } else {
      copyToClipboard(profileUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success('Profile link copied to clipboard');
      },
      () => {
        toast.error('Failed to copy profile link');
      }
    );
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-lg sm:rounded-xl" />

      <div className="relative bg-white border border-border rounded-lg sm:rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative group shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl sm:text-3xl md:text-4xl shadow-lg ring-4 ring-white">
                {account.firstName?.[0]}
                {account.lastName?.[0]}
              </div>
              {account.emailVerified && (
                <div className="absolute -bottom-1 -right-1 w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-3 sm:border-4 border-white flex items-center justify-center shadow-lg">
                  <FiCheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left sm:pt-2 w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {account.firstName} {account.lastName}
                </h1>
                {account.emailVerified && (
                  <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-primary/10 rounded-full border border-primary/20">
                    <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    <span className="text-xs font-semibold text-primary">Verified</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 text-muted-foreground">
                <div className="flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-muted/50 rounded-lg">
                  <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-medium">
                    {capitalize(account.country)}
                  </span>
                </div>
                <span className="hidden sm:inline text-muted-foreground/50">•</span>
                <span className="text-xs sm:text-sm">{currentTime} local time</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-2 sm:mt-0 flex-wrap">
            <Button
              variant="default"
              size="sm"
              onClick={handleViewPublic}
              className="gap-2 shadow-sm"
            >
              <FiEye className="w-4 h-4" />
              <span className="hidden sm:inline">View Public</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSettings}
              className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all shadow-sm"
            >
              <FiSettings className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all shadow-sm"
            >
              <FiShare2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
