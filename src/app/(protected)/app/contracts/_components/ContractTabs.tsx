interface ContractTabsProps {
  activeTab: 'jobs' | 'mentorships';
  onTabChange: (tab: 'jobs' | 'mentorships') => void;
}

export function ContractTabs({ activeTab, onTabChange }: ContractTabsProps) {
  const tabs: { key: 'jobs' | 'mentorships'; label: string }[] = [
    { key: 'jobs', label: 'Job Contracts' },
    { key: 'mentorships', label: 'Mentorship Contracts' },
  ];

  return (
    <div className="flex items-center gap-4 border-b mt-4">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          className={`px-4 py-3 font-medium transition-colors relative cursor-pointer ${
            activeTab === key ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {label}
          {activeTab === key && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
}
