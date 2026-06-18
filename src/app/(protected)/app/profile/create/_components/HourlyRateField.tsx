import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FieldError } from './FieldError';

interface HourlyRateFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
}

export function HourlyRateField({ register, errors }: HourlyRateFieldProps) {
  return (
    <div>
      <label
        htmlFor="hourlyRate"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Hourly Rate ($)
        <span className="text-red-500 ml-1">*</span>
      </label>
      <input
        type="number"
        id="hourlyRate"
        step="0.01"
        {...register('hourlyRate', {
          required: 'Hourly rate is required',
          valueAsNumber: true,
          min: {
            value: 0.01,
            message: 'Hourly rate must be greater than 0',
          },
        })}
        className={`block w-full px-4 py-3 border ${
          errors.hourlyRate ? 'border-destructive' : 'border-input'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
        placeholder="e.g., 25"
      />
      <FieldError error={errors.hourlyRate} />
    </div>
  );
}
