'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { useSwitchAccount } from '@/hooks/useAuth';
import { getHomeRoute } from '@/lib/utils';
import toast from 'react-hot-toast';
import { HiBriefcase, HiUserGroup, HiUser, HiLogout } from 'react-icons/hi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function UserMenu() {
  const router = useRouter();
  const { user, clearTokens } = useAuthStore();

  const { mutate: switchAccount, isPending } = useSwitchAccount({
    onSuccess: (newUserType) => {
      const roleLabel = newUserType === UserType.CLIENT ? 'Client' : 'Freelancer';
      toast.success(`Switched to ${roleLabel} account`);
      router.push(getHomeRoute(newUserType));
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to switch account');
    },
  });

  const handleLogout = () => {
    clearTokens();
    router.push('/login');
  };

  const handleSwitchAccount = (userType: UserType) => {
    if (user?.currentType !== userType) {
      switchAccount(userType);
    }
  };

  return (
    <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold text-sm ring-2 ring-white shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col">
              <span className="font-medium">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                {user?.email}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/app/profile')} className="cursor-pointer">
            <HiUser className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          {user?.client && user?.freelancer && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Switch Account
              </DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleSwitchAccount(UserType.FREELANCER)}
                disabled={isPending || user?.currentType === UserType.FREELANCER}
                className="cursor-pointer"
              >
                <HiUserGroup className="w-4 h-4 mr-2" />
                Freelancer
                {user?.currentType === UserType.FREELANCER && (
                  <span className="ml-auto text-xs text-primary">Active</span>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSwitchAccount(UserType.CLIENT)}
                disabled={isPending || user?.currentType === UserType.CLIENT}
                className="cursor-pointer"
              >
                <HiBriefcase className="w-4 h-4 mr-2" />
                Client
                {user?.currentType === UserType.CLIENT && (
                  <span className="ml-auto text-xs text-primary">Active</span>
                )}
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <HiLogout className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
