import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FieldError } from './FieldError';

interface TitleFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  titleLength: number;
}

export function TitleField({
  register,
  errors,
  titleLength,
}: TitleFieldProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-700"
        >
          Professional Title
          <span className="text-red-500 ml-1">*</span>
        </label>
        <span
          className={`text-xs ${
            titleLength > 50
              ? 'text-red-500'
              : titleLength > 40
              ? 'text-yellow-500'
              : 'text-gray-500'
          }`}
        >
          {titleLength}/50
        </span>
      </div>
      <input
        type="text"
        id="title"
        {...register('title', {
          required: 'Professional title is required',
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters',
          },
          maxLength: {
            value: 50,
            message: 'Title must be at most 50 characters',
          },
        })}
        className={`block w-full px-4 py-3 border ${
          errors.title ? 'border-destructive' : 'border-input'
        } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
        placeholder="e.g., Full Stack Developer, UI/UX Designer, Content Writer"
      />
      <FieldError error={errors.title} />
    </div>
  );
}
