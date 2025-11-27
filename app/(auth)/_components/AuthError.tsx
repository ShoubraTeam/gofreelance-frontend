interface AuthErrorProps {
  message: string;
}

export const AuthError = ({ message }: AuthErrorProps): React.ReactElement | null => {
  if (!message) return null;

  return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 border border-red-200">
      {message}
    </div>
  );
};
