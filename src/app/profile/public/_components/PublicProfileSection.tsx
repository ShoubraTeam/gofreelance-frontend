import { Card } from '@/components/ui/card';

interface PublicProfileSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export function PublicProfileSection({
  icon,
  title,
  children,
  isLast = false,
}: PublicProfileSectionProps): React.ReactElement {
  return (
    <Card className={`bg-white border border-border rounded-xl shadow-sm p-6 ${isLast ? '' : 'mb-6'}`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </Card>
  );
}
