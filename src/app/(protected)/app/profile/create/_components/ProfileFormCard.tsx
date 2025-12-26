import { ReactNode } from 'react';

interface ProfileFormCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradientFrom: string;
  gradientTo: string;
  children: ReactNode;
}

export function ProfileFormCard({
  title,
  description,
  icon,
  gradientFrom,
  gradientTo,
  children,
}: ProfileFormCardProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div
            className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-8 py-10 text-white`}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {icon}
              </div>
            </div>
            <h2 className="text-center text-3xl font-bold">{title}</h2>
            <p className={`mt-3 text-center ${gradientFrom === 'from-blue-600' ? 'text-blue-100' : 'text-purple-100'}`}>
              {description}
            </p>
          </div>

          {/* Form */}
          {children}
        </div>
      </div>
    </div>
  );
}
