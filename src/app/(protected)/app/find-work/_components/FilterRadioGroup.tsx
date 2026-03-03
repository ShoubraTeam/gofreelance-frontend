interface FilterRadioGroupProps {
  title: string;
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  bordered?: boolean;
}

export function FilterRadioGroup({
  title,
  name,
  options,
  value,
  onChange,
  bordered = false,
}: FilterRadioGroupProps): React.ReactElement {
  return (
    <div className={bordered ? 'border-t border-gray-200 pt-6' : ''}>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center cursor-pointer group">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary cursor-pointer"
            />
            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
