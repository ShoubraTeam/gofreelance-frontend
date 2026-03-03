import { MdError } from 'react-icons/md';

interface FieldErrorProps {
  error?: { message?: string };
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null;
  return (
    <p className="mt-2 text-sm text-red-600 flex items-center">
      <MdError className="w-4 h-4 mr-1" />
      {error.message as string}
    </p>
  );
}
