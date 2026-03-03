import { PricingCard } from './PricingCard';
import type { PricingPlan } from './PricingCard';

export const PricingSection = (): React.ReactElement => {
  const plans: PricingPlan[] = [
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
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
