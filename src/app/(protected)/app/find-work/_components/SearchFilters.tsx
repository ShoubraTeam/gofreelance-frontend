'use client';

import { useState } from 'react';
import { FilterRadioGroup } from './FilterRadioGroup';
import { FilterCheckboxGroup } from './FilterCheckboxGroup';

interface SearchFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const AVAILABLE_SKILLS = [
  'React',
  'Node.js',
  'TypeScript',
  'Python',
  'UI/UX Design',
  'WordPress',
  'Content Writing',
  'Data Analysis',
  'Mobile Development',
  'DevOps',
];

const BUDGET_RANGES = [
  { label: 'Any Budget', value: 'any' },
  { label: 'Under $1,000', value: '0-1000' },
  { label: '$1,000 - $5,000', value: '1000-5000' },
  { label: '$5,000 - $10,000', value: '5000-10000' },
  { label: 'Over $10,000', value: '10000+' },
];

const JOB_TYPES = [
  { label: 'All Types', value: 'all' },
  { label: 'Fixed Price', value: 'fixed' },
  { label: 'Hourly', value: 'hourly' },
];

const PROPOSAL_COUNTS = ['Less than 5', '5 to 10', '10 to 20', 'More than 20'];

export function SearchFilters({ selectedSkills, onSkillsChange }: SearchFiltersProps) {
  const [selectedBudget, setSelectedBudget] = useState('any');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [selectedProposals, setSelectedProposals] = useState<string[]>([]);

  const clearFilters = () => {
    onSkillsChange([]);
    setSelectedBudget('any');
    setSelectedJobType('all');
    setSelectedProposals([]);
  };

  const toggleSkill = (skill: string) => {
    onSkillsChange(
      selectedSkills.includes(skill)
        ? selectedSkills.filter((s) => s !== skill)
        : [...selectedSkills, skill]
    );
  };

  const toggleProposal = (label: string) => {
    setSelectedProposals((prev) =>
      prev.includes(label) ? prev.filter((p) => p !== label) : [...prev, label]
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        <FilterRadioGroup
          title="Job Type"
          name="jobType"
          options={JOB_TYPES}
          value={selectedJobType}
          onChange={setSelectedJobType}
        />

        <FilterRadioGroup
          title="Budget Range"
          name="budget"
          options={BUDGET_RANGES}
          value={selectedBudget}
          onChange={setSelectedBudget}
          bordered
        />

        <FilterCheckboxGroup
          title="Skills"
          options={AVAILABLE_SKILLS.map((skill) => ({
            label: skill,
            checked: selectedSkills.includes(skill),
            onChange: () => toggleSkill(skill),
          }))}
          bordered
        />

        <FilterCheckboxGroup
          title="Proposals"
          options={PROPOSAL_COUNTS.map((label) => ({
            label,
            checked: selectedProposals.includes(label),
            onChange: () => toggleProposal(label),
          }))}
          bordered
        />
      </div>
    </div>
  );
}
