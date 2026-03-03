import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FieldError } from './FieldError';

interface BioFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  bioLength: number;
  placeholder: string;
}

export function BioField({
  register,
  errors,
  bioLength,
  placeholder,
}: BioFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="bio"
          className="block text-sm font-semibold text-gray-700"
        >
          Bio
          <span className="text-red-500 ml-1">*</span>
        </label>
        <span
          className={`text-xs ${
            bioLength > 250
              ? 'text-red-500'
              : bioLength > 200
              ? 'text-yellow-500'
              : 'text-gray-500'
          }`}
        >
          {bioLength}/250
        </span>
      </div>
      <textarea
        id="bio"
        rows={5}
        {...register('bio', {
          required: 'Bio is required',
          minLength: {
            value: 3,
            message: 'Bio must be at least 3 characters',
          },
          maxLength: {
            value: 250,
            message: 'Bio must be at most 250 characters',
          },
        })}
        className={`block w-full px-4 py-3 border ${
          errors.bio ? 'border-destructive' : 'border-input'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none`}
        placeholder={placeholder}
      />
      <FieldError error={errors.bio} />
    </div>
  );
}
