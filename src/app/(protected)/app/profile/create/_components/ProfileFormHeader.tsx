interface ProfileFormHeaderProps {
  type: 'client' | 'freelancer';
  icon: React.ReactNode;
  title: string;
  description: string;
  gradientClass: string;
}

export function ProfileFormHeader({
  icon,
  title,
  description,
  gradientClass,
}: ProfileFormHeaderProps) {
  return (
    <div className={`${gradientClass} px-8 py-10 text-primary-foreground`}>
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h2 className="text-center text-3xl font-bold">{title}</h2>
      <p className="mt-3 text-center text-primary-foreground/80">
        {description}
      </p>
    </div>
  );
}
