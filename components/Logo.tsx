import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  href?: string;
  iconClassName?: string;
  textClassName?: string;
}

export const Logo = ({
  className,
  href = '/',
  iconClassName,
  textClassName,
}: LogoProps): React.ReactElement => {
  const logoContent = (
    <>
      <div
        className={cn(
          'h-8 w-8 bg-primary rounded-lg flex items-center justify-center',
          iconClassName
        )}
      >
        <span className="text-primary-foreground font-bold text-lg">G</span>
      </div>
      <span className={cn('text-xl font-bold', textClassName)}>
        GoFreelance
      </span>
    </>
  );

  return (
    <Link href={href} className={cn('flex items-center space-x-2', className)}>
      {logoContent}
    </Link>
  );
};
