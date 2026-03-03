'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { FiPlus } from 'react-icons/fi';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest } from '@/lib/types/job';
import type { GetProfileResponse } from '@/lib/types/profile';
import { StepIndicator } from './StepIndicator';
import { JobTitleStep } from './JobTitleStep';
import { JobDescriptionStep } from './JobDescriptionStep';
import { JobBudgetStep } from './JobBudgetStep';

const STEP_LABELS = ['Job Title', 'Job Description', 'Budget & Requirements'];

interface JobCreationFormProps {
  form: UseFormReturn<NewJobRequest>;
  currentStep: number;
  totalSteps: number;
  isPending: boolean;
  hasExistingJobs: boolean;
  clientProfiles: GetProfileResponse[];
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
  clientProfiles,
  onStepChange,
  onCancel,
  onSubmit,
}: JobCreationFormProps) {
  const { handleSubmit, trigger } = form;

  const handleNext = async () => {
    if (currentStep === 1) {
      const valid = await trigger(['profileId', 'title']);
      if (valid) onStepChange(2);
    } else if (currentStep === 2) {
      const valid = await trigger(['content']);
      if (valid) onStepChange(3);
    }
  };

  return (
    <Card className="mb-8 border-primary/20 shadow-lg">
      <CardContent className="p-6">
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          labels={STEP_LABELS}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {currentStep === 1 && (
            <JobTitleStep form={form} clientProfiles={clientProfiles} />
          )}

          {currentStep === 2 && (
            <JobDescriptionStep form={form} />
          )}

          {currentStep === 3 && (
            <JobBudgetStep form={form} />
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
              <Button type="button" onClick={handleNext} className="ml-auto">
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
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
