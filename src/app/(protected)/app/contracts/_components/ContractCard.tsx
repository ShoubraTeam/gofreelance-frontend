'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ContractResponse } from '@/lib/types/contract';
import { UserType } from '@/lib/types/auth';
import { capitalize } from '@/lib/utils';
import { CONTRACT_STATUS_STYLES, shortContractId } from './contract-status';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiUser, FiFileText } from 'react-icons/fi';

interface ContractCardProps {
  contract: ContractResponse;
  currentType: UserType;
}

export function ContractCard({ contract, currentType }: ContractCardProps) {
  const router = useRouter();

  return (
    <Card className="hover:border-primary/40 transition-colors">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <FiFileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Contract #{shortContractId(contract.contractId)}
              </p>
              <p className="text-xs text-muted-foreground">{contract.contractId}</p>
            </div>
          </div>
          <Badge className={CONTRACT_STATUS_STYLES[contract.contractStatus]}>
            {capitalize(contract.contractStatus)}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground border-t pt-4">
          <div className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 text-primary" />
            <span>{new Date(contract.createdAt).toLocaleDateString()}</span>
          </div>

          {currentType === UserType.CLIENT && (
            <div className="flex items-center gap-1.5">
              <FiUser className="w-4 h-4 text-primary" />
              <button
                className={`transition-colors ${contract.freelancerId ? 'hover:text-primary' : 'opacity-40 cursor-not-allowed'}`}
                onClick={() => {
                  if (contract.freelancerId) {
                    router.push(`/profile/public/${contract.freelancerId}`);
                  }
                }}
              >
                View Freelancer
              </button>
            </div>
          )}

          {currentType === UserType.FREELANCER && (
            <div className="flex items-center gap-1.5">
              <FiUser className="w-4 h-4 text-primary" />
              <button
                className={`transition-colors ${contract.authorId ? 'hover:text-primary' : 'opacity-40 cursor-not-allowed'}`}
                onClick={() => {
                  if (contract.authorId) {
                    router.push(`/profile/public/client/${contract.authorId}`);
                  }
                }}
              >
                View Client
              </button>
            </div>
          )}

          <div className="ml-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => router.push(`/app/contracts/${contract.contractId}`)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
