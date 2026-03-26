'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { DisputeListItem } from '@/lib/types/dispute';

interface DisputeCardProps {
  dispute: DisputeListItem;
}

export function DisputeCard({ dispute }: DisputeCardProps) {
  const router = useRouter();

  return (
    <Card
      className="hover:border-primary/40 transition-colors cursor-pointer"
      onClick={() => router.push(`/app/disputes/${dispute.id}`)}
    >
      <CardContent className="p-5 flex items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <p className="font-medium text-foreground truncate">{dispute.title}</p>
          <p className="text-xs text-muted-foreground">
            Opened by {dispute.initiatorFirstName} {dispute.initiatorLastName}
            {' · '}
            <span className="font-mono">{dispute.contractId.slice(0, 8).toUpperCase()}</span>
          </p>
        </div>
        <Badge variant="outline" className="shrink-0 capitalize">
          {dispute.initiatorType.toLowerCase()}
        </Badge>
      </CardContent>
    </Card>
  );
}
