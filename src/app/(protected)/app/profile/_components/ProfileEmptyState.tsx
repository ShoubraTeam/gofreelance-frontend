import { Button } from '@/components/ui/button';

interface ProfileEmptyStateProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
}

export function ProfileEmptyState({ message, actionLabel, onAction }: ProfileEmptyStateProps) {
  return (
    <div className="text-center py-8">
      <p className="text-muted-foreground text-sm">{message}</p>
      <Button variant="outline" size="sm" className="mt-4" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
}
