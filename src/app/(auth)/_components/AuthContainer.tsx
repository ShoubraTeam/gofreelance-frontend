import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AuthContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  maxWidth?: 'md' | 'lg';
}

export const AuthContainer = ({
  title,
  description,
  children,
  maxWidth = 'md',
}: AuthContainerProps): React.ReactElement => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-primary/10 to-secondary/15 px-4 py-12">
      <Card className={cn('w-full', maxWidth === 'md' ? 'max-w-md' : 'max-w-lg')}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};
