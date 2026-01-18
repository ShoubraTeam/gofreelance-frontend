import { UseFormReturn, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
  const [countryOpen, setCountryOpen] = useState(false);

  return (
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
  );
}
