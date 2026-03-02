import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login, register, switchAccount, createClientAccount, createFreelancerAccount, verifyToken } from '@/lib/api/auth';
import type { LoginCredentials, RegisterData, AuthenticationResponse, User } from '@/lib/types/auth';
import { UserType } from '@/lib/types/auth';
import type { ApiResponse } from '@/lib/types/api';
import { useAuthStore } from '@/store/useAuthStore';

export function useLogin(options?: {
  onSuccess?: (data: ApiResponse<AuthenticationResponse>) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useRegister(options?: {
  onSuccess?: (data: ApiResponse<AuthenticationResponse>) => void;
  onError?: (error: Error) => void;
}) {
  return useMutation({
    mutationFn: (data: RegisterData) => register(data),
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });
}

export function useCreateAccount(options?: {
  onSuccess?: (result: { userType: UserType; userData: User }) => void;
  onError?: (error: Error) => void;
}) {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userType: UserType) => {
      if (userType === UserType.CLIENT) {
        await createClientAccount();
      } else {
        await createFreelancerAccount();
      }
      const userResponse = await verifyToken();
      return { userType, userData: userResponse.data };
    },
    onSuccess: ({ userType, userData }) => {
      setUser(userData);
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });
      options?.onSuccess?.({ userType, userData });
    },
    onError: options?.onError,
  });
}

export function useSwitchAccount(options?: {
  onSuccess?: (userType: UserType) => void;
  onError?: (error: Error) => void;
}) {
  const { setUser, user } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userType: UserType) => switchAccount(userType),
    onSuccess: (_, userType) => {
      if (user) {
        setUser({
          ...user,
          currentType: userType,
        });
      }

      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      queryClient.invalidateQueries({ queryKey: ['profile-details'] });
      queryClient.invalidateQueries({ queryKey: ['account'] });

      options?.onSuccess?.(userType);
    },
    onError: options?.onError,
  });
}
