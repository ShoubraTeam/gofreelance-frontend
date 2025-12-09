import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { verifyToken } from '@/lib/api/auth';

export function useAuthValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { accessToken, _hasHydrated, setUser, clearTokens } = useAuthStore();

  useEffect(() => {
    if (!_hasHydrated) {
      return;
    }

    const validateToken = async () => {
      if (!accessToken) {
        setIsValid(false);
        return;
      }

      setIsValidating(true);
      try {
        const response = await verifyToken();
        setUser(response.data);
        setIsValid(true);
      } catch {
        clearTokens();
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_hasHydrated]); // Run when store hydration completes

  return {
    isValidating,
    isValid,
  };
}
