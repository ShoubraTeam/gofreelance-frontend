import { apiClient } from './client';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  User,
} from '../types/auth';

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse, LoginCredentials>(
    '/auth/login',
    credentials
  );
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return apiClient.post<AuthResponse, RegisterData>('/auth/register', data);
}

export async function refreshToken(
  refreshToken: string
): Promise<AuthResponse> {
  return apiClient.post<AuthResponse, { refreshToken: string }>(
    '/auth/refresh',
    {
      refreshToken,
    }
  );
}

export async function verifyToken(): Promise<{ data: User }> {
  return apiClient.get<{ data: User }>('/me', { requiresAuth: true });
}
