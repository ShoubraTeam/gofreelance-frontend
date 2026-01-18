import { UseFormRegister, FieldErrors } from 'react-hook-form';

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
      {errors.title && (
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
          {errors.title.message as string}
        </p>
      )}
    </div>
  );
}
