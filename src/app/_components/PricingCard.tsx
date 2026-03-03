import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IoSparkles } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  ctaLink: string;
  variant: 'outline' | 'default';
  highlighted: boolean;
  badge?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps): React.ReactElement {
  return (
    <Card
      className={cn(
        'relative',
        plan.highlighted
          ? 'bg-primary text-primary-foreground transform scale-105 shadow-2xl border-primary'
          : 'border-2 border-gray-200 hover:border-primary transition-colors'
      )}
    >
      {plan.badge && (
        <Badge className="absolute -top-4 right-0 sm:-right-4 z-10 bg-linear-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-400 hover:via-yellow-500 hover:to-orange-500 text-white px-4 py-2 text-sm font-bold">
          <IoSparkles className="h-4 w-4 mr-1.5" />
          {plan.badge}
        </Badge>
      )}
      <CardHeader>
        <CardTitle
          className={cn('text-2xl', !plan.highlighted && 'text-gray-900')}
        >
          {plan.name}
        </CardTitle>
        <CardDescription
          className={cn(
            plan.highlighted ? 'text-primary-foreground/80' : 'text-gray-600'
          )}
        >
          {plan.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span
            className={cn('text-4xl font-bold', !plan.highlighted && 'text-gray-900')}
          >
            {plan.price}
          </span>
          <span
            className={cn(
              plan.highlighted ? 'text-primary-foreground/80' : 'text-gray-600'
            )}
          >
            {plan.period}
          </span>
        </div>
        <ul className="space-y-4 mb-6">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <FaCheck
                className={cn(
                  'h-5 w-5 mr-2 shrink-0 mt-0.5',
                  plan.highlighted ? 'text-white' : 'text-green-500'
                )}
              />
              <span className={cn(!plan.highlighted && 'text-gray-600')}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={plan.ctaLink} className="w-full">
          {plan.highlighted ? (
            <Button className="w-full bg-white text-primary hover:bg-gray-100">
              {plan.cta}
            </Button>
          ) : (
            <Button variant={plan.variant} className="w-full">
              {plan.cta}
            </Button>
          )}
        </Link>
      </CardFooter>
    </Card>
  );
}
