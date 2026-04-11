'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiZap } from 'react-icons/fi';
import toast from 'react-hot-toast';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest } from '@/lib/types/job';
import { detectTools, enhanceDescription } from '@/lib/api/jobs';
import { ToolChipsEditor } from './ToolChipsEditor';
import { EnhancedDescriptionPreview } from './EnhancedDescriptionPreview';

type AiState = 'idle' | 'detecting' | 'tool-selection' | 'enhancing' | 'preview';

interface JobDescriptionStepProps {
  form: UseFormReturn<NewJobRequest>;
}

export function JobDescriptionStep({ form }: JobDescriptionStepProps): React.ReactElement {
  const { register, watch, setValue, formState: { errors } } = form;

  const [aiState, setAiState] = useState<AiState>('idle');
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [enhancedDescription, setEnhancedDescription] = useState('');

  const title = watch('title');
  const content = watch('content');

  const { mutate: runDetectTools, isPending: isDetecting } = useMutation({
    mutationFn: detectTools,
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('AI suggestions unavailable, please try again');
        setAiState('idle');
        return;
      }
      const tools = res.data.tools ?? [];
      setSelectedTools(tools);
      if (res.data.hasTools) {
        runEnhance({ jobTitle: title, jobDescription: content, tools: res.data.tools ?? [] });
      } else {
        setSelectedTools(res.data.tools ?? []);
        setAiState('tool-selection');
      }
    },
    onError: () => {
      toast.error('AI suggestions unavailable, please try again');
      setAiState('idle');
    },
  });

  const { mutate: runEnhance, isPending: isEnhancing } = useMutation({
    mutationFn: enhanceDescription,
    onSuccess: (res) => {
      if (!res.success) {
        toast.error('AI suggestions unavailable, please try again');
        setAiState('idle');
        return;
      }
      setEnhancedDescription(res.data.enhancedDescription);
      setAiState('preview');
    },
    onError: () => {
      toast.error('AI suggestions unavailable, please try again');
      setAiState('idle');
    },
  });

  const handleEnhanceClick = () => {
    if (!title?.trim() || !content?.trim()) {
      toast.error('Please fill in the job title and description first');
      return;
    }
    setAiState('detecting');
    runDetectTools({ jobTitle: title, jobDescription: content });
  };

  const handleGenerateEnhancement = () => {
    setAiState('enhancing');
    runEnhance({ jobTitle: title, jobDescription: content, tools: selectedTools });
  };

  const handleAccept = () => {
    setValue('content', enhancedDescription);
    setAiState('idle');
    setEnhancedDescription('');
    setSelectedTools([]);
  };

  const handleDiscard = () => {
    setAiState('idle');
    setEnhancedDescription('');
    setSelectedTools([]);
  };

  const isProcessing = isDetecting || isEnhancing;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-lg font-semibold text-foreground mb-3">
          Describe your project
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Textarea
          {...register('content', {
            required: 'Job description is required',
          })}
          rows={8}
          placeholder="Describe your project, requirements, and expectations..."
          className={`text-base ${errors.content ? 'border-destructive' : ''}`}
          disabled={aiState === 'preview'}
        />
        {errors.content && (
          <p className="mt-2 text-sm text-destructive">{errors.content.message}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Include project goals, required skills, deliverables, and timeline
          </p>
          {aiState === 'idle' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleEnhanceClick}
              className="flex items-center gap-1.5 text-primary border-primary/30 hover:bg-primary/5"
            >
              <FiZap className="w-3.5 h-3.5" />
              Enhance with AI
            </Button>
          )}
          {isProcessing && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              {isDetecting ? 'Detecting tools...' : 'Enhancing description...'}
            </div>
          )}
        </div>
      </div>

      {aiState === 'tool-selection' && (
        <div className="rounded-lg border border-border p-4 space-y-3 bg-muted/30">
          <p className="text-sm font-medium text-foreground">
            No tools were detected in your description. Add relevant tools or technologies to improve the AI enhancement:
          </p>
          <ToolChipsEditor tools={selectedTools} onChange={setSelectedTools} />
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={handleDiscard}>
              Cancel
            </Button>
            <Button type="button" size="sm" onClick={handleGenerateEnhancement}>
              <FiZap className="w-3.5 h-3.5 mr-1" />
              Generate Enhancement
            </Button>
          </div>
        </div>
      )}

      {aiState === 'preview' && (
        <EnhancedDescriptionPreview
          original={content}
          enhanced={enhancedDescription}
          onAccept={handleAccept}
          onDiscard={handleDiscard}
        />
      )}
    </div>
  );
}
