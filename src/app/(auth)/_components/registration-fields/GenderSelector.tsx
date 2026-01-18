import { UseFormReturn, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { RegistrationFormData } from '@/lib/types/registration';

interface GenderSelectorProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
}

export function GenderSelector({ form, isLoading }: GenderSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="gender">Gender</Label>
      <Controller
        name="gender"
        control={form.control}
        render={({ field }) => (
          <Select
            onValueChange={field.onChange}
            value={field.value}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {form.formState.errors.gender && (
        <p className="text-xs text-red-500">
          {form.formState.errors.gender.message}
        </p>
      )}
    </div>
  );
}
