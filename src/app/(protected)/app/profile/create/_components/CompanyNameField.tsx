import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { MdBusiness } from 'react-icons/md';
import { FieldError } from './FieldError';

interface CompanyNameFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
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
          <MdBusiness className="h-5 w-5 text-gray-400" />
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
      <FieldError error={errors.companyName} />
    </div>
  );
}
