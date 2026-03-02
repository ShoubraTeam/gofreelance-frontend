import type { ContractStatus } from '@/lib/types/contract';

export const CONTRACT_STATUS_STYLES: Record<ContractStatus, string> = {
  OPENED: 'bg-primary/10 text-primary',
  COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  TERMINATED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
};

export function shortContractId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}
