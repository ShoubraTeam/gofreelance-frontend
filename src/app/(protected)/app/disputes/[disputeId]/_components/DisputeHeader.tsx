'use client';

import { Badge } from '@/components/ui/badge';
import { FiCalendar } from 'react-icons/fi';
import type { DisputeDetail, DisputeStatus } from '@/lib/types/dispute';

const STATUS_STYLES: Record<DisputeStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  RESOLVED: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
};

interface DisputeHeaderProps {
  dispute: DisputeDetail;
}

export function DisputeHeader({ dispute }: DisputeHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{dispute.title}</h1>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <FiCalendar className="w-3.5 h-3.5" />
          <span>{new Date(dispute.createdAt).toLocaleDateString()}</span>
          <span>·</span>
          <span className="font-mono">{dispute.contractId.slice(0, 8).toUpperCase()}</span>
        </div>
      </div>
      <Badge className={STATUS_STYLES[dispute.status]}>{dispute.status}</Badge>
    </div>
  );
}
