'use client';

import { useSwitchAccount } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { getHomeRoute, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiBriefcase, HiUserGroup } from 'react-icons/hi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountSwitcherProps {
  variant?: 'navbar' | 'profile';
  className?: string;
}

export function AccountSwitcher({
  variant = 'profile',
  className,
}: AccountSwitcherProps) {
  const router = useRouter();
  const { user } = useAuthStore();
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

  if (!user) return null;

  const roles = [
    {
      value: UserType.CLIENT,
      label: 'Client',
      icon: HiBriefcase,
      enabled: user.client,
    },
    {
      value: UserType.FREELANCER,
      label: 'Freelancer',
      icon: HiUserGroup,
      enabled: user.freelancer,
    },
  ];

  const handleSwitchAccount = (newUserType: string) => {
    if (newUserType === user.currentType) {
      return;
    }
    switchAccount(newUserType as UserType);
  };

  if (variant === 'navbar') {
    return (
      <Select
        value={user.currentType}
        onValueChange={handleSwitchAccount}
        disabled={isPending}
      >
        <SelectTrigger className={cn('w-[140px] h-8 text-xs', className)} size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <SelectItem
                key={role.value}
                value={role.value}
                disabled={!role.enabled || isPending}
              >
                <Icon className="w-4 h-4" />
                <span>{role.label}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">Account Type</label>
      <div className="flex gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = user.currentType === role.value;
          return (
            <button
              key={role.value}
              onClick={() => handleSwitchAccount(role.value)}
              disabled={!role.enabled || isPending || isSelected}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background hover:border-primary/50',
                (!role.enabled || isSelected) && 'opacity-50 cursor-not-allowed'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{role.label}</span>
              {isPending && isSelected && (
                <span className="ml-2 text-xs text-muted-foreground">
                  Switching...
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
