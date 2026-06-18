import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import toast from 'react-hot-toast';
import { UserType } from './types/auth';
import { ApiError } from './api/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
  return str
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getHomeRoute(currentType: UserType): string {
  return currentType === UserType.FREELANCER ? '/app/find-work' : '/app/hire-talent';
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function getApiErrorCode(error: unknown): string | undefined {
  if (error instanceof ApiError) return error.code;
  return undefined;
}

export function createSaveHandlers(
  entityName: string,
  isEditing: boolean,
  onOpenChange: (open: boolean) => void,
  onSuccess: () => void
) {
  return {
    onSuccess: () => {
      toast.success(`${entityName} ${isEditing ? 'updated' : 'added'} successfully`);
      onOpenChange(false);
      onSuccess();
    },
    onError: () => {
      toast.error(`Failed to save ${entityName.toLowerCase()}`);
    },
  };
}
