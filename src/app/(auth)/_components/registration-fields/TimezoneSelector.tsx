import { UseFormReturn } from 'react-hook-form';
import { ComboboxField } from './ComboboxField';
import type { RegistrationFormData } from '@/lib/types/registration';

interface TimezoneSelectorProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
  isLoadingCountries: boolean;
  timezones: { value: string; label: string }[];
  selectedCountry: string;
}

export function TimezoneSelector({
  form,
  isLoading,
  isLoadingCountries,
  timezones,
  selectedCountry,
}: TimezoneSelectorProps) {
  return (
    <ComboboxField
      form={form}
      name="timezone"
      label="Timezone"
      items={timezones}
      disabled={isLoading || isLoadingCountries || !selectedCountry}
      placeholder={selectedCountry ? 'Select timezone' : 'Select a country first'}
      searchPlaceholder="Search timezone..."
      emptyText="No timezone found."
    />
  );
}
