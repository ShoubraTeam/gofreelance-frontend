import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/lib/api/auth';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '@/lib/types/auth';

export function useLogin(options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useRegister(options?: {
  onSuccess?: (data: AuthResponse) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}
