'use client';

import { useState, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiX, FiPlus } from 'react-icons/fi';

interface ToolChipsEditorProps {
  tools: string[];
  onChange: (tools: string[]) => void;
}

export function ToolChipsEditor({ tools, onChange }: ToolChipsEditorProps) {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleRemove = (tool: string) => {
    onChange(tools.filter((t) => t !== tool));
  };

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || tools.includes(trimmed)) return;
    onChange([...tools, trimmed]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Badge
            key={tool}
            variant="default"
            className="flex items-center gap-1 px-2 py-1 text-sm"
          >
            {tool}
            <button
              type="button"
              onClick={() => handleRemove(tool)}
              className="ml-1 hover:text-destructive transition-colors cursor-pointer"
              aria-label={`Remove ${tool}`}
            >
              <FiX className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        {tools.length === 0 && (
          <p className="text-sm text-muted-foreground">No tools selected. Add some below.</p>
        )}
      </div>
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tool or technology..."
          className="max-w-xs text-sm"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={!inputValue.trim()}
        >
          <FiPlus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
