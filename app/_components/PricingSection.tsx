import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IoSparkles } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export const PricingSection = (): React.ReactElement => {
  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: '$0',
      period: '/month',
      features: [
        '5 proposals per month',
        'Basic AI matching',
        'Secure payments',
        'Email support',
      ],
      cta: 'Get Started',
      ctaLink: '/register',
      variant: 'outline' as const,
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For serious professionals',
      price: '$29',
      period: '/month',
      features: [
        'Unlimited proposals',
        'Advanced AI matching',
        'AI proposal assistant',
        'Priority support',
        'Financial analytics',
      ],
      cta: 'Get Started',
      ctaLink: '/register',
      variant: 'default' as const,
      highlighted: true,
      badge: 'Popular',
    },
    {
      name: 'Enterprise',
      description: 'For teams and agencies',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integrations',
        '24/7 phone support',
      ],
      cta: 'Contact Sales',
      ctaLink: '/contact',
      variant: 'outline' as const,
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
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
                  className={cn(
                    'text-2xl',
                    !plan.highlighted && 'text-gray-900'
                  )}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription
                  className={cn(
                    plan.highlighted
                      ? 'text-primary-foreground/80'
                      : 'text-gray-600'
                  )}
                >
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span
                    className={cn(
                      'text-4xl font-bold',
                      !plan.highlighted && 'text-gray-900'
                    )}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={cn(
                      plan.highlighted
                        ? 'text-primary-foreground/80'
                        : 'text-gray-600'
                    )}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-4 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
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
          ))}
        </div>
      </div>
    </section>
  );
};
