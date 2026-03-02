'use client';

import { Badge } from '@/components/ui/badge';
import type { IdentityStatus } from '@/lib/types/auth';
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

interface VerificationStatusProps {
  status: IdentityStatus;
}

const statusConfig: Record<
  IdentityStatus,
  {
    label: string;
    icon: React.ReactNode;
    className: string;
  }
> = {
  VERIFIED: {
    label: 'Verified',
    icon: <HiOutlineCheckCircle className="h-4 w-4" />,
    className: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  },
  ON_HOLD: {
    label: 'Under Review',
    icon: <HiOutlineClock className="h-4 w-4" />,
    className: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
  },
  REJECTED: {
    label: 'Rejected',
    icon: <HiOutlineXCircle className="h-4 w-4" />,
    className: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
  },
  UNVERIFIED: {
    label: 'Not Verified',
    icon: <HiOutlineExclamationCircle className="h-4 w-4" />,
    className: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700',
  },
};

export function VerificationStatus({ status }: VerificationStatusProps): React.ReactElement {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={`gap-1.5 py-1 px-3 ${config.className}`}>
      {config.icon}
      {config.label}
    </Badge>
  );
}
