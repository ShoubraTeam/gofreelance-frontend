import { apiClient } from './client';
import type {
  LoginCredentials,
  RegisterData,
  AuthenticationResponse,
  User,
  AccountInfo,
  UserType,
} from '../types/auth';
import type { ApiResponse } from '../types/api';

export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<AuthenticationResponse>> {
  return apiClient.post<ApiResponse<AuthenticationResponse>, LoginCredentials>(
    '/auth/login',
    credentials
  );
}

export async function register(
  data: RegisterData
): Promise<ApiResponse<AuthenticationResponse>> {
  return apiClient.post<ApiResponse<AuthenticationResponse>, RegisterData>(
    '/auth/register',
    data
  );
}

export async function refreshToken(
  refreshToken: string
): Promise<ApiResponse<AuthenticationResponse>> {
  return apiClient.post<
    ApiResponse<AuthenticationResponse>,
    { refreshToken: string }
  >('/auth/refresh', {
    refreshToken,
  });
}

export async function verifyToken(): Promise<ApiResponse<User>> {
  return apiClient.get<ApiResponse<User>>('/me', { requiresAuth: true });
}

export async function getAccountInfo(): Promise<ApiResponse<AccountInfo>> {
  return apiClient.get<ApiResponse<AccountInfo>>('/me/info', {
    requiresAuth: true,
  });
}

export async function switchAccount(
  userType: UserType
): Promise<ApiResponse<void>> {
  return apiClient.patch<ApiResponse<void>, { userType: string }>(
    '/me/switch',
    { userType },
    { requiresAuth: true }
  );
}
