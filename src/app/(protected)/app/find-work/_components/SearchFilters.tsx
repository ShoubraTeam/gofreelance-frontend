'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  selectedSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

const availableSkills = [
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

const budgetRanges = [
  { label: 'Any Budget', value: 'any' },
  { label: 'Under $1,000', value: '0-1000' },
  { label: '$1,000 - $5,000', value: '1000-5000' },
  { label: '$5,000 - $10,000', value: '5000-10000' },
  { label: 'Over $10,000', value: '10000+' },
];

const jobTypes = [
  { label: 'All Types', value: 'all' },
  { label: 'Fixed Price', value: 'fixed' },
  { label: 'Hourly', value: 'hourly' },
];

export function SearchFilters({
  selectedSkills,
  onSkillsChange,
}: SearchFiltersProps) {
  const [selectedBudget, setSelectedBudget] = useState('any');
  const [selectedJobType, setSelectedJobType] = useState('all');

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillsChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onSkillsChange([...selectedSkills, skill]);
    }
  };

  const clearFilters = () => {
    onSkillsChange([]);
    setSelectedBudget('any');
    setSelectedJobType('all');
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
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Job Type</h4>
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type.value}
                  checked={selectedJobType === type.value}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                  {type.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Budget Range
          </h4>
          <div className="space-y-2">
            {budgetRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="radio"
                  name="budget"
                  value={range.value}
                  checked={selectedBudget === range.value}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Skills</h4>
          <div className="space-y-2">
            {availableSkills.map((skill) => (
              <label
                key={skill}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                  {skill}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Proposals
          </h4>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                Less than 5
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                5 to 10
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                10 to 20
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                More than 20
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
