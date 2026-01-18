import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { RegistrationFormData } from '@/lib/types/registration';

interface PhotoUploadFieldProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
}

export function PhotoUploadField({ form, isLoading }: PhotoUploadFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="personalPhoto">Personal Photo (Optional)</Label>
      <Input
        id="personalPhoto"
        type="file"
        accept="image/*"
        disabled={isLoading}
        {...form.register('personalPhoto')}
      />
      {form.formState.errors.personalPhoto?.message && (
        <p className="text-xs text-red-500">
          {String(form.formState.errors.personalPhoto.message)}
        </p>
      )}
    </div>
  );
}
