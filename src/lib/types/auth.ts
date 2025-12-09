import type { RegistrationFormData } from './registration';

export interface LoginCredentials {
  username: string;
  password: string;
}

export type UserType = 'CLIENT' | 'FREELANCER';

export interface RegisterData extends RegistrationFormData {
  userType: UserType;
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
