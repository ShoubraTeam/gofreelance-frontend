import { FaCheckCircle } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  details: string[];
}

interface StepCardProps {
  step: Step;
  isLast: boolean;
  animationDelay?: number;
}

export function StepCard({ step, isLast, animationDelay = 0 }: StepCardProps): React.ReactElement {
  const Icon = step.icon;

  return (
    <div
      className="group relative"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {!isLast && (
        <div className="hidden lg:block absolute top-16 left-full w-6 h-0.5 bg-linear-to-r from-gray-300 to-gray-200 z-0" />
      )}

      <Card className="relative h-full border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-1">
        <Badge className="absolute -top-3 -right-3 h-10 w-10 rounded-xl bg-linear-to-br from-gray-900 to-gray-700 hover:from-gray-900 hover:to-gray-700 shadow-lg flex items-center justify-center">
          <span className="text-lg font-bold text-white">{step.number}</span>
        </Badge>

        <CardHeader className="pb-0">
          <div
            className={`inline-flex h-12 w-12 ${step.gradient} rounded-xl items-center justify-center mb-2 shadow-md group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-6 w-6 text-white" />
          </div>

          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {step.title}
          </CardTitle>
          <CardDescription className="text-xs">{step.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2">
            {step.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                <FaCheckCircle className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-tight">{detail}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
