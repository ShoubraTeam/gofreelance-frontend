'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { FiX } from 'react-icons/fi';

const TAG_REGEX = /^[a-zA-Z0-9_]+$/;

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function TagInput({ tags, onChange, disabled, placeholder = 'Add tags...' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const addTags = (raw: string) => {
    const candidates = raw.split(/[\s,]+/).filter(Boolean);
    const invalid = candidates.find((t) => !TAG_REGEX.test(t));
    if (invalid) {
      setError('Tags can only contain letters, numbers, and underscores');
      return;
    }
    setError('');
    const newTags = candidates.filter((t) => !tags.includes(t));
    if (newTags.length > 0) onChange([...tags, ...newTags]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
      e.preventDefault();
      if (inputValue.trim()) addTags(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleChange = (value: string) => {
    if (error) setError('');
    setInputValue(value);
  };

  const handleRemove = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleBlur = () => {
    if (inputValue.trim()) addTags(inputValue);
  };

  return (
    <div className="space-y-2">
      <div
        className="flex flex-wrap gap-2 min-h-10 p-2 rounded-md border border-input bg-background cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <Badge key={tag} variant="default" className="flex items-center gap-1 text-sm h-6">
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleRemove(tag); }}
                className="ml-0.5 hover:text-destructive transition-colors cursor-pointer"
                aria-label={`Remove ${tag}`}
              >
                <FiX className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
        {!disabled && (
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder={tags.length === 0 ? placeholder : ''}
            className="border-0 shadow-none p-0 h-6 min-w-24 flex-1 focus-visible:ring-0 text-sm"
            disabled={disabled}
          />
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <p className="text-xs text-muted-foreground">
        Press Enter, Space, or comma to add. Only letters, numbers, and underscores allowed.
      </p>
    </div>
  );
}
