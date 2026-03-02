import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';

interface ProfileSectionCardProps {
  title: string;
  actionIcon: ComponentType<{ className?: string }>;
  onAction: () => void;
  children: React.ReactNode;
}

export function ProfileSectionCard({
  title,
  actionIcon: Icon,
  onAction,
  children,
}: ProfileSectionCardProps) {
  return (
    <div className="bg-white border border-border rounded-sm p-6 shadow-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onAction}>
          <Icon className="w-7 h-7" />
        </Button>
      </div>
      {children}
    </div>
  );
}
