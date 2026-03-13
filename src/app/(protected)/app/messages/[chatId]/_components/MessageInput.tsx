'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { FiSend } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="shrink-0 border-t border-border bg-card px-4 py-3">
      {disabled && (
        <p className="text-xs text-muted-foreground text-center mb-2">
          This chat has ended and is read-only.
        </p>
      )}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={disabled ? 'Chat ended' : 'Type a message… (Enter to send)'}
          rows={1}
          maxLength={2000}
          className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed min-h-[42px] max-h-[120px] overflow-y-auto"
        />
        <Button
          type="button"
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          size="icon"
          className="shrink-0 rounded-xl h-[42px] w-[42px]"
        >
          <FiSend className="w-4 h-4" />
        </Button>
      </div>
      {value.length > 1800 && (
        <p className="text-xs text-muted-foreground mt-1 text-right">{value.length}/2000</p>
      )}
    </div>
  );
}
