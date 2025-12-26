import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { UserType } from './types/auth';

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
