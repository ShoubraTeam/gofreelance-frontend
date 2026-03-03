interface CheckboxOption {
  label: string;
  checked: boolean;
  onChange: () => void;
}

interface FilterCheckboxGroupProps {
  title: string;
  options: CheckboxOption[];
  bordered?: boolean;
}

export function FilterCheckboxGroup({
  title,
  options,
  bordered = false,
}: FilterCheckboxGroupProps): React.ReactElement {
  return (
    <div className={bordered ? 'border-t border-gray-200 pt-6' : ''}>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.label} className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={option.checked}
              onChange={option.onChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
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
