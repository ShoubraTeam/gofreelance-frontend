import type { RegistrationFormData } from './registration';

export interface LoginCredentials {
  username: string;
  password: string;
}

export enum UserType {
  CLIENT = 'CLIENT',
  FREELANCER = 'FREELANCER',
}

export interface RegisterData extends RegistrationFormData {
  userType: UserType;
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
  tokenType?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  currentType: UserType;
  client: boolean;
  freelancer: boolean;
  personalPhoto: string;
}

export type Gender = 'MALE' | 'FEMALE';
export type IdentityStatus = 'UNVERIFIED' | 'ON_HOLD' | 'REJECTED' | 'VERIFIED';

export interface AccountInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  country: string;
  timezone: string;
  gender: Gender;
  identityStatus: IdentityStatus;
  emailVerified: boolean;
  personalPhoto?: string;
  currentType: UserType;
  freelancer: boolean;
  client: boolean;
}
