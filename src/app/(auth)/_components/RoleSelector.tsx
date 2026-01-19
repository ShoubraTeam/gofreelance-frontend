import { Label } from '@/components/ui/label';
import { UserType } from '@/lib/types/auth';
import { cn } from '@/lib/utils';
import { HiBriefcase, HiUserGroup } from 'react-icons/hi';

interface RoleSelectorProps {
  selectedRole: UserType | null;
  onRoleSelect: (role: UserType) => void;
  disabled?: boolean;
}

export const RoleSelector = ({
  selectedRole,
  onRoleSelect,
  disabled = false,
}: RoleSelectorProps): React.ReactElement => {
  const roles = [
    {
      id: 'FREELANCER' as UserType,
      icon: HiBriefcase,
      title: 'Find Work',
      subtitle: 'As a Freelancer',
    },
    {
      id: 'CLIENT' as UserType,
      icon: HiUserGroup,
      title: 'Hire Talent',
      subtitle: 'As a Client',
    },
  ];

  return (
    <div className="space-y-2">
      <Label>I want to</Label>
      <div className="grid grid-cols-2 gap-3">
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleSelect(role.id)}
              className={cn(
                'flex flex-col items-center justify-center rounded-lg border-2 p-4 transition-all hover:border-primary',
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-gray-200 bg-white'
              )}
              disabled={disabled}
            >
              <Icon
                className={cn(
                  'h-8 w-8 mb-2',
                  isSelected ? 'text-primary' : 'text-gray-600'
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  isSelected ? 'text-primary' : 'text-gray-700'
                )}
              >
                {role.title}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                {role.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
