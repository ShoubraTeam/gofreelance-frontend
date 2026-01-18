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
  const [timezoneOpen, setTimezoneOpen] = useState(false);

  return (
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
                  ? timezones.find((timezone) => timezone.value === field.value)
                      ?.label
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
  );
}
