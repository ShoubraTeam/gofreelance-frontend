import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface CompanyNameFieldProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export function CompanyNameField({ register, errors }: CompanyNameFieldProps) {
  return (
    <div>
      <label
        htmlFor="companyName"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Company Name
        <span className="text-red-500 ml-1">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <input
          id="companyName"
          type="text"
          {...register('companyName', {
            required: 'Company name is required',
            minLength: {
              value: 3,
              message: 'Company name must be at least 3 characters',
            },
            maxLength: {
              value: 50,
              message: 'Company name must be at most 50 characters',
            },
          })}
          className={`block w-full pl-10 pr-3 py-3 border ${
            errors.companyName ? 'border-destructive' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors`}
          placeholder="Enter your company name"
        />
      </div>
      {errors.companyName && (
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
          {errors.companyName.message as string}
        </p>
      )}
    </div>
  );
}
