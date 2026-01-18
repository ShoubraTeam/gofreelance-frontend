import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface Specialization {
  id: string;
  type: string;
}

interface SpecializationFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  specializations: Specialization[];
}

export function SpecializationField({
  register,
  errors,
  specializations,
}: SpecializationFieldProps) {
  return (
    <div>
      <label
        htmlFor="specializationId"
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        Specialization
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <select
          id="specializationId"
          {...register('specializationId', {
            required: 'Specialization is required',
          })}
          className={`block w-full pl-10 pr-3 py-3 border ${
            errors.specializationId ? 'border-destructive' : 'border-input'
          } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors appearance-none bg-white`}
        >
          <option value="">Select your specialization</option>
          {specializations.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.type}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      {errors.specializationId && (
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
          {errors.specializationId.message as string}
        </p>
      )}
    </div>
  );
}
