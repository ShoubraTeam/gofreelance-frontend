import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoleSelector } from './RoleSelector';
import type { RegistrationFormData, UserRole } from '@/lib/types/registration';

interface RegistrationStepOneProps {
  form: UseFormReturn<RegistrationFormData>;
  selectedRole: UserRole | null;
  onRoleSelect: (role: UserRole) => void;
  isLoading: boolean;
  onNext: () => void;
}

export function RegistrationStepOne({
  form,
  selectedRole,
  onRoleSelect,
  isLoading,
}: RegistrationStepOneProps): React.ReactElement {
  return (
    <>
      <RoleSelector
        selectedRole={selectedRole}
        onRoleSelect={onRoleSelect}
        disabled={isLoading}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="John"
            disabled={isLoading}
            {...form.register('firstName')}
          />
          {form.formState.errors.firstName && (
            <p className="text-xs text-red-500">{form.formState.errors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            disabled={isLoading}
            {...form.register('lastName')}
          />
          {form.formState.errors.lastName && (
            <p className="text-xs text-red-500">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          disabled={isLoading}
          {...form.register('email')}
        />
        {form.formState.errors.email && (
          <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          disabled={isLoading}
          {...form.register('password')}
        />
        {form.formState.errors.password && (
          <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          disabled={isLoading}
          {...form.register('confirmPassword')}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Next
      </Button>
    </>
  );
}
