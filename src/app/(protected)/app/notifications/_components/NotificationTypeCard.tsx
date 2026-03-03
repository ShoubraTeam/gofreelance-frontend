import { Card, CardContent } from '@/components/ui/card';

interface NotificationTypeCardProps {
  icon: React.ReactNode;
  iconBgClass: string;
  title: string;
  description: string;
}

export function NotificationTypeCard({
  icon,
  iconBgClass,
  title,
  description,
}: NotificationTypeCardProps): React.ReactElement {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div
            className={`w-10 h-10 ${iconBgClass} rounded-lg flex items-center justify-center shrink-0`}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
