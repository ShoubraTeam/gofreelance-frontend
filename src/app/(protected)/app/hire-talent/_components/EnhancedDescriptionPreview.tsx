'use client';

import { Button } from '@/components/ui/button';
import { FiCheck, FiX } from 'react-icons/fi';

interface EnhancedDescriptionPreviewProps {
  original: string;
  enhanced: string;
  onAccept: () => void;
  onDiscard: () => void;
}

export function EnhancedDescriptionPreview({
  original,
  enhanced,
  onAccept,
  onDiscard,
}: EnhancedDescriptionPreviewProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4 bg-muted/30">
      <p className="text-sm font-medium text-foreground">AI Enhancement Preview</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Original</p>
          <div className="rounded-md border border-border bg-background p-3 text-sm text-foreground whitespace-pre-wrap min-h-[120px]">
            {original}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wide">Enhanced</p>
          <div className="rounded-md border border-secondary/40 bg-secondary/5 p-3 text-sm text-foreground whitespace-pre-wrap min-h-[120px]">
            {enhanced}
          </div>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" size="sm" onClick={onDiscard}>
          <FiX className="w-4 h-4 mr-1" />
          Discard
        </Button>
        <Button type="button" size="sm" onClick={onAccept}>
          <FiCheck className="w-4 h-4 mr-1" />
          Accept Enhancement
        </Button>
      </div>
    </div>
  );
}
