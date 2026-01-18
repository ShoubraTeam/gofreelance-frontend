'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { FiPlus } from 'react-icons/fi';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest, ExperienceLevel } from '@/lib/types/job';

interface JobCreationFormProps {
  form: UseFormReturn<NewJobRequest>;
  currentStep: number;
  totalSteps: number;
  isPending: boolean;
  hasExistingJobs: boolean;
  onStepChange: (step: number) => void;
  onCancel: () => void;
  onSubmit: (data: NewJobRequest) => void;
}

export function JobCreationForm({
  form,
  currentStep,
  totalSteps,
  isPending,
  hasExistingJobs,
  onStepChange,
  onCancel,
  onSubmit,
}: JobCreationFormProps) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  const experienceLevel = watch('experienceLevel');

  const handleNext = () => {
    if (currentStep === 1) {
      const titleValue = watch('title');
      if (titleValue && titleValue.length > 0) {
        onStepChange(2);
      }
    } else if (currentStep === 2) {
      const contentValue = watch('content');
      if (contentValue && contentValue.length > 0) {
        onStepChange(3);
      }
    }
  };

  return (
    <Card className="mb-8 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <div className="mb-8">
          <div className="flex items-center w-full mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex items-center"
                style={{ flex: step < totalSteps ? 1 : '0 0 auto' }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}:{' '}
              {currentStep === 1 && 'Job Title'}
              {currentStep === 2 && 'Job Description'}
              {currentStep === 3 && 'Budget & Requirements'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-semibold text-foreground mb-3">
                  What is your job title?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  {...register('title', {
                    required: 'Job title is required',
                    maxLength: { value: 250, message: 'Max 250 characters' },
                  })}
                  placeholder="e.g., Full Stack Developer for E-commerce Platform"
                  className={`text-base ${errors.title ? 'border-destructive' : ''}`}
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose a clear, descriptive title that will attract the right freelancers
                </p>
              </div>
            </div>
          )}

          {currentStep === 2 && (
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
                  <p className="mt-2 text-sm text-destructive">
                    {errors.content.message}
                  </p>
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  Include project goals, required skills, deliverables, and timeline
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
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
                  <p className="mt-2 text-sm text-destructive">
                    {errors.jobPrice.message}
                  </p>
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
                  onValueChange={(value) =>
                    setValue('experienceLevel', value as ExperienceLevel)
                  }
                >
                  <SelectTrigger className="text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ANY">Any Level</SelectItem>
                    <SelectItem value="JUNIOR">Junior (0-2 years)</SelectItem>
                    <SelectItem value="MID_LEVEL">Mid Level (2-5 years)</SelectItem>
                    <SelectItem value="SENIOR">Senior (5+ years)</SelectItem>
                    <SelectItem value="EXPERT">Expert (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select the minimum experience level for this job
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => onStepChange(currentStep - 1)}
              >
                Back
              </Button>
            )}

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isPending} className="ml-auto">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Job...
                  </>
                ) : (
                  <>
                    <FiPlus className="w-4 h-4 mr-2" />
                    Create Job
                  </>
                )}
              </Button>
            )}

            {hasExistingJobs && (
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
