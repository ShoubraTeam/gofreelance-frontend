import { Textarea } from '@/components/ui/textarea';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest } from '@/lib/types/job';

interface JobDescriptionStepProps {
  form: UseFormReturn<NewJobRequest>;
}

export function JobDescriptionStep({ form }: JobDescriptionStepProps): React.ReactElement {
  const { register, formState: { errors } } = form;

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
            maxLength: { value: 1500, message: 'Max 1500 characters' },
          })}
          rows={8}
          placeholder="Describe your project, requirements, and expectations..."
          className={`text-base ${errors.content ? 'border-destructive' : ''}`}
        />
        {errors.content && (
          <p className="mt-2 text-sm text-destructive">{errors.content.message}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Include project goals, required skills, deliverables, and timeline
        </p>
      </div>
    </div>
  );
}
