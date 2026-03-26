'use client';

import { Card, CardContent } from '@/components/ui/card';
import { FiUser } from 'react-icons/fi';
import type { DisputeDetail } from '@/lib/types/dispute';

interface DisputePartiesProps {
  dispute: DisputeDetail;
}

export function DisputeParties({ dispute }: DisputePartiesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <FiUser className="w-3.5 h-3.5" />
            <span>Initiator ({dispute.initiatorType.toLowerCase()})</span>
          </div>
          <p className="font-medium text-sm">
            {dispute.initiatorFirstName} {dispute.initiatorLastName}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <FiUser className="w-3.5 h-3.5" />
            <span>Accused</span>
          </div>
          <p className="font-medium text-sm">
            {dispute.accusedFirstName} {dispute.accusedLastName}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
