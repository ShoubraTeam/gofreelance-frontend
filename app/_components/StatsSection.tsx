import { Card, CardContent } from '@/components/ui/card';

export const StatsSection = (): React.ReactElement => {
  const stats = [
    { value: '50K+', label: 'Active Freelancers' },
    { value: '10K+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '$2M+', label: 'Paid to Freelancers' },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-sm">
              <CardContent className="text-center p-6">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
