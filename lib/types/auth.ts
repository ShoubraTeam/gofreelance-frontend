import type { RegistrationFormData, UserRole } from './registration';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData extends RegistrationFormData {
  userType: 'CLIENT' | 'FREELANCER';
}

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  client: boolean;
  freelancer: boolean;
  personalPhoto: string;
}

export type { UserRole };
