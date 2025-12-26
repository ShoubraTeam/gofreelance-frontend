import { useAuthStore } from '@/store/useAuthStore';
import type { ValidationError } from '../types/api';

const API_BASE_URL = 'http://localhost:8080/api/v1';

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
}

export class ApiValidationError extends Error {
  public validationErrors: ValidationError[];

  constructor(message: string, validationErrors: ValidationError[]) {
    super(message);
    this.name = 'ApiValidationError';
    this.validationErrors = validationErrors;
  }
}

class ApiClient {
  private baseUrl: string;
  private isRefreshing = false;
  private refreshPromise: Promise<void> | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(requiresAuth = false): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async refreshAccessToken(): Promise<void> {
    const { refreshToken, setTokens, clearTokens } = useAuthStore.getState();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const data = (await response.json()) as {
        data: { accessToken: string; refreshToken: string };
      };
      setTokens(data.data.accessToken, data.data.refreshToken);
    } catch (error) {
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw error;
    }
  }

  private async handleResponse<T>(
    response: Response,
    options: RequestOptions
  ): Promise<T> {
    if (!response.ok) {
      if (response.status === 401 && options.requiresAuth) {
        throw new Error('UNAUTHORIZED');
      }

      const errorData = (await response.json().catch(() => ({
        message: `Request failed with status ${response.status}`,
      }))) as {
        message?: string;
        error?: string;
        validationErrors?: Array<{ field: string; message: string }>;
      };

      if (errorData.validationErrors && errorData.validationErrors.length > 0) {
        throw new ApiValidationError(
          errorData.error || 'Validation failed',
          errorData.validationErrors
        );
      }

      throw new Error(
        errorData.error ||
          errorData.message ||
          `Request failed with status ${response.status}`
      );
    }

    return response.json();
  }

  async request<TResponse, TBody = void>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: TBody,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    const { requiresAuth = false, ...fetchOptions } = options;

    const makeRequest = async (): Promise<Response> => {
      return fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: this.getHeaders(requiresAuth),
        body: data ? JSON.stringify(data) : undefined,
        ...fetchOptions,
      });
    };

    try {
      const response = await makeRequest();
      return await this.handleResponse<TResponse>(response, options);
    } catch (error) {
      // If unauthorized and requires auth, try to refresh the token
      if (
        error instanceof Error &&
        error.message === 'UNAUTHORIZED' &&
        requiresAuth &&
        !endpoint.includes('/auth/refresh')
      ) {
        // If already refreshing, wait for the ongoing refresh
        if (this.isRefreshing && this.refreshPromise) {
          await this.refreshPromise;
        } else {
          // Start refreshing
          this.isRefreshing = true;
          this.refreshPromise = this.refreshAccessToken().finally(() => {
            this.isRefreshing = false;
            this.refreshPromise = null;
          });
          await this.refreshPromise;
        }

        // Retry the original request with the new token
        const retryResponse = await makeRequest();
        return await this.handleResponse<TResponse>(retryResponse, options);
      }

      throw error;
    }
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, options);
  }

  async post<TResponse, TBody = void>(
    endpoint: string,
    data?: TBody,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('POST', endpoint, data, options);
  }

  async put<TResponse, TBody = void>(
    endpoint: string,
    data?: TBody,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('PUT', endpoint, data, options);
  }

  async delete<TResponse>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    return this.request<TResponse>('DELETE', endpoint, undefined, options);
  }

  async patch<TResponse, TBody = void>(
    endpoint: string,
    data?: TBody,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    return this.request<TResponse, TBody>('PATCH', endpoint, data, options);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
