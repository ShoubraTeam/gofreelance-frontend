import { UseFormReturn } from 'react-hook-form';
import { useMemo } from 'react';
import { useCountries } from '@/hooks/useCountries';
import type { RegistrationFormData } from '@/lib/types/registration';
import { PhoneNumberField } from './registration-fields/PhoneNumberField';
import { GenderSelector } from './registration-fields/GenderSelector';
import { BirthdateField } from './registration-fields/BirthdateField';
import { CountrySelector } from './registration-fields/CountrySelector';
import { TimezoneSelector } from './registration-fields/TimezoneSelector';
import { PhotoUploadField } from './registration-fields/PhotoUploadField';
import { FormNavigation } from './registration-fields/FormNavigation';

interface RegistrationStepTwoProps {
  form: UseFormReturn<RegistrationFormData>;
  isLoading: boolean;
  onBack: () => void;
}

const capitalizeCountry = (country: string): string => {
  return country
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function RegistrationStepTwo({
  form,
  isLoading,
  onBack,
}: RegistrationStepTwoProps): React.ReactElement {
  const { data: countriesData, isLoading: isLoadingCountries } = useCountries();

  const selectedCountry = form.watch('country');

  const countries = useMemo(() => {
    if (!countriesData?.data) return [];
    return Object.keys(countriesData.data).map((country) => ({
      value: country.toLowerCase(),
      label: capitalizeCountry(country),
    }));
  }, [countriesData]);

  const timezones = useMemo(() => {
    if (!countriesData?.data || !selectedCountry) return [];
    const countryTimezones =
      countriesData.data[selectedCountry.toLowerCase()] || [];
    return countryTimezones.map((tz) => ({
      value: tz,
      label: tz,
    }));
  }, [countriesData, selectedCountry]);

  return (
    <>
      <PhoneNumberField form={form} isLoading={isLoading} />

      <GenderSelector form={form} isLoading={isLoading} />

      <BirthdateField form={form} isLoading={isLoading} />

      <CountrySelector
        form={form}
        isLoading={isLoading}
        isLoadingCountries={isLoadingCountries}
        countries={countries}
      />

      <TimezoneSelector
        form={form}
        isLoading={isLoading}
        isLoadingCountries={isLoadingCountries}
        timezones={timezones}
        selectedCountry={selectedCountry}
      />

      <PhotoUploadField form={form} isLoading={isLoading} />

      <FormNavigation isLoading={isLoading} onBack={onBack} />
    </>
  );
}
