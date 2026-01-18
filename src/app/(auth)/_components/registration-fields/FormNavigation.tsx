import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface FormNavigationProps {
  isLoading: boolean;
  onBack: () => void;
}

export function FormNavigation({ isLoading, onBack }: FormNavigationProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create account'}
        </Button>
      </div>

      <p className="text-xs text-center text-gray-600">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </>
  );
}
