'use client';

import { useSwitchAccount, useCreateAccount } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { UserType } from '@/lib/types/auth';
import { getHomeRoute, cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiBriefcase, HiUserGroup, HiPlus } from 'react-icons/hi';
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
  const { mutate: switchAccount, isPending: isSwitching } = useSwitchAccount({
    onSuccess: (newUserType) => {
      const roleLabel = newUserType === UserType.CLIENT ? 'Client' : 'Freelancer';
      toast.success(`Switched to ${roleLabel} account`);
      router.push(getHomeRoute(newUserType));
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to switch account');
    },
  });

  const { mutate: createAccount, isPending: isCreating } = useCreateAccount({
    onSuccess: ({ userType }) => {
      const roleLabel = userType === UserType.CLIENT ? 'Client' : 'Freelancer';
      toast.success(`${roleLabel} account created! You can now switch to it.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create account');
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

  const isPending = isSwitching || isCreating;

  const handleSwitchAccount = (newUserType: string) => {
    if (newUserType === user.currentType) {
      return;
    }
    switchAccount(newUserType as UserType);
  };

  const handleCreateAccount = (userType: UserType) => {
    createAccount(userType);
  };

  if (variant === 'navbar') {
    return (
      <Select
        value={user.currentType}
        onValueChange={(value) => {
          const role = roles.find((r) => r.value === value);
          if (role?.enabled) {
            handleSwitchAccount(value);
          } else if (role) {
            handleCreateAccount(role.value);
          }
        }}
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
                disabled={isPending}
              >
                {role.enabled ? (
                  <>
                    <Icon className="w-4 h-4" />
                    <span>{role.label}</span>
                  </>
                ) : (
                  <>
                    <HiPlus className="w-4 h-4" />
                    <span>Become {role.label}</span>
                  </>
                )}
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

          if (!role.enabled) {
            return (
              <button
                key={role.value}
                onClick={() => handleCreateAccount(role.value)}
                disabled={isPending}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                  'border-dashed border-muted-foreground/50 bg-background hover:border-primary/50 hover:bg-primary/5',
                  isPending && 'opacity-50 cursor-not-allowed'
                )}
              >
                <HiPlus className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">Become {role.label}</span>
              </button>
            );
          }

          return (
            <button
              key={role.value}
              onClick={() => handleSwitchAccount(role.value)}
              disabled={isPending || isSelected}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-background hover:border-primary/50',
                isSelected && 'cursor-default'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{role.label}</span>
              {isSwitching && !isSelected && (
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
