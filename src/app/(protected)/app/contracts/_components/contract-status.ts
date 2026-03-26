import type { ContractStatus } from '@/lib/types/contract';

export const CONTRACT_STATUS_STYLES: Record<ContractStatus, string> = {
  OPEN: 'bg-primary/10 text-primary',
  ON_DISPUTE: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  CLOSED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

export function shortContractId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}
