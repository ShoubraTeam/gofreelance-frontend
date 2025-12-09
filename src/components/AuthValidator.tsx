'use client';

import { useAuthValidation } from '@/hooks/useAuthValidation';

export function AuthValidator() {
  useAuthValidation();
  return null;
}
