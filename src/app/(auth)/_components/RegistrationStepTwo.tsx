import { UseFormReturn, Controller } from 'react-hook-form';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useCountries } from '@/hooks/useCountries';
import type { RegistrationFormData } from '@/lib/types/registration';

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
  const [countryOpen, setCountryOpen] = useState(false);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
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

      <div className="space-y-2">
        <Label htmlFor="country">Country</Label>
        <Controller
          name="country"
          control={form.control}
          render={({ field }) => (
            <Popover open={countryOpen} onOpenChange={setCountryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={countryOpen}
                  className="w-full justify-between"
                  disabled={isLoading || isLoadingCountries}
                >
                  {field.value
                    ? countries.find((country) => country.value === field.value)
                        ?.label
                    : 'Select country'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.value}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? '' : currentValue
                            );
                            // Clear timezone when country changes
                            if (currentValue !== field.value) {
                              form.setValue('timezone', '');
                            }
                            setCountryOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === country.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {country.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {form.formState.errors.country && (
          <p className="text-xs text-red-500">
            {form.formState.errors.country.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone</Label>
        <Controller
          name="timezone"
          control={form.control}
          render={({ field }) => (
            <Popover open={timezoneOpen} onOpenChange={setTimezoneOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={timezoneOpen}
                  className="w-full justify-between"
                  disabled={isLoading || isLoadingCountries || !selectedCountry}
                >
                  {field.value
                    ? timezones.find(
                        (timezone) => timezone.value === field.value
                      )?.label
                    : selectedCountry
                    ? 'Select timezone'
                    : 'Select a country first'}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search timezone..." />
                  <CommandList>
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandGroup>
                      {timezones.map((timezone) => (
                        <CommandItem
                          key={timezone.value}
                          value={timezone.value}
                          onSelect={(currentValue) => {
                            field.onChange(
                              currentValue === field.value ? '' : currentValue
                            );
                            setTimezoneOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              field.value === timezone.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {timezone.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
        />
        {form.formState.errors.timezone && (
          <p className="text-xs text-red-500">
            {form.formState.errors.timezone.message}
          </p>
        )}
      </div>

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

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </div>

      <p className="text-xs text-center text-gray-600">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}
