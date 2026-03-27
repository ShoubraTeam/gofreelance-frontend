interface MentorshipTabsProps {
  activeTab: 'browse' | 'mine';
  onTabChange: (tab: 'browse' | 'mine') => void;
}

export function MentorshipTabs({ activeTab, onTabChange }: MentorshipTabsProps) {
  const tabs: { key: 'browse' | 'mine'; label: string }[] = [
    { key: 'browse', label: 'Browse Mentorships' },
    { key: 'mine', label: 'My Mentorships' },
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
