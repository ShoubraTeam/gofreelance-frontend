import { UseFormReturn } from 'react-hook-form';
import { ComboboxField } from './ComboboxField';
import type { RegistrationFormData } from '@/lib/types/registration';

interface CountrySelectorProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
  isLoadingCountries: boolean;
  countries: { value: string; label: string }[];
}

export function CountrySelector({
  form,
  isLoading,
  isLoadingCountries,
  countries,
}: CountrySelectorProps) {
  return (
    <ComboboxField
      form={form}
      name="country"
      label="Country"
      items={countries}
      disabled={isLoading || isLoadingCountries}
      placeholder="Select country"
      searchPlaceholder="Search country..."
      emptyText="No country found."
      onValueChange={() => form.setValue('timezone', '')}
    />
  );
}
