import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegistrationFormData } from '@/lib/types/registration';

interface BirthdateFieldProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
}

export function BirthdateField({ form, isLoading }: BirthdateFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="birthDate">Birth Date</Label>
      <Input
        id="birthDate"
        type="date"
        disabled={isLoading}
        {...form.register('birthDate')}
      />
      {form.formState.errors.birthDate && (
        <p className="text-xs text-red-500">
          {form.formState.errors.birthDate.message}
        </p>
      )}
    </div>
  );
}
