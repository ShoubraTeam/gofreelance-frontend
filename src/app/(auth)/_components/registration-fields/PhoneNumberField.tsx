import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegistrationFormData } from '@/lib/types/registration';

interface PhoneNumberFieldProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
}

export function PhoneNumberField({ form, isLoading }: PhoneNumberFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input
        id="phoneNumber"
        type="tel"
        placeholder="+1 (555) 123-4567"
        disabled={isLoading}
        {...form.register('phoneNumber')}
      />
      {form.formState.errors.phoneNumber && (
        <p className="text-xs text-red-500">
          {form.formState.errors.phoneNumber.message}
        </p>
      )}
    </div>
  );
}
