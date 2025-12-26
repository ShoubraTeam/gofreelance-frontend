/**
 * Standard validation error structure returned by the API
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Standard API response wrapper used across all endpoints
 * @template T - The type of data returned in the response
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  code?: string;
  validationErrors?: ValidationError[];
}
