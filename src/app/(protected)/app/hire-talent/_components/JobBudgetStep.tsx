import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest, ExperienceLevel } from '@/lib/types/job';
import { EXPERIENCE_LEVEL_OPTIONS } from '@/lib/types/job';

interface JobBudgetStepProps {
  form: UseFormReturn<NewJobRequest>;
}

export function JobBudgetStep({ form }: JobBudgetStepProps): React.ReactElement {
  const { register, watch, setValue, formState: { errors } } = form;
  const experienceLevel = watch('experienceLevel');

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-lg font-semibold text-foreground mb-3">
          What is your budget?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <Input
            type="number"
            {...register('jobPrice', {
              required: 'Budget is required',
              min: { value: 1, message: 'Budget must be at least $1' },
            })}
            placeholder="5000"
            className={`pl-7 text-base ${errors.jobPrice ? 'border-destructive' : ''}`}
          />
        </div>
        {errors.jobPrice && (
          <p className="mt-2 text-sm text-destructive">{errors.jobPrice.message}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Set a competitive budget to attract quality freelancers
        </p>
      </div>

      <div>
        <label className="block text-lg font-semibold text-foreground mb-3">
          Experience level required
        </label>
        <Select
          value={experienceLevel}
          onValueChange={(value) => setValue('experienceLevel', value as ExperienceLevel)}
        >
          <SelectTrigger className="text-base">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXPERIENCE_LEVEL_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="mt-2 text-sm text-muted-foreground">
          Select the minimum experience level for this job
        </p>
      </div>
    </div>
  );
}
