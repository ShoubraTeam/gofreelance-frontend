import { HiLightningBolt, HiShieldCheck, HiUsers, HiLightBulb, HiLockClosed, HiChartBar } from 'react-icons/hi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const FeaturesSection = (): React.ReactElement => {
  const features = [
    {
      icon: HiLightningBolt,
      gradient: 'from-primary to-secondary',
      title: 'AI-Powered Matching',
      description:
        'Our advanced AI analyzes skills, experience, and preferences to recommend the perfect matches for both freelancers and clients.',
    },
    {
      icon: HiShieldCheck,
      gradient: 'from-green-500 to-green-600',
      title: 'Secure Payments',
      description:
        'Milestone-based escrow system ensures safe transactions. Funds are protected until work is approved by the client.',
    },
    {
      icon: HiUsers,
      gradient: 'from-purple-500 to-purple-600',
      title: 'Skill Development',
      description:
        'Access mentorship programs and learning resources. Experienced freelancers can guide newcomers to success.',
    },
    {
      icon: HiLightBulb,
      gradient: 'from-orange-500 to-orange-600',
      title: 'AI Writing Assistant',
      description:
        'Get AI-powered suggestions for proposals, job descriptions, and professional communication to stand out.',
    },
    {
      icon: HiLockClosed,
      gradient: 'from-pink-500 to-pink-600',
      title: 'Identity Verification',
      description:
        'Verified profiles using national ID ensure trust and safety. Work with confidence knowing identities are confirmed.',
    },
    {
      icon: HiChartBar,
      gradient: 'from-secondary to-primary',
      title: 'Financial Insights',
      description:
        'Track earnings, expenses, and project performance with detailed reports and analytics dashboard.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose GoFreelance?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge AI technology with human expertise to create
            the best freelancing experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-0">
                  <div
                    className={`h-14 w-14 bg-linear-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
