import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface BioFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
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
      {errors.bio && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {errors.bio.message as string}
        </p>
      )}
    </div>
  );
}
