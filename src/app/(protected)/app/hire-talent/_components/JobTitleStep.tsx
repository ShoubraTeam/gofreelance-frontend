import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UseFormReturn } from 'react-hook-form';
import type { NewJobRequest } from '@/lib/types/job';
import type { GetProfileResponse } from '@/lib/types/profile';

interface JobTitleStepProps {
  form: UseFormReturn<NewJobRequest>;
  clientProfiles: GetProfileResponse[];
}

export function JobTitleStep({ form, clientProfiles }: JobTitleStepProps): React.ReactElement {
  const { register, watch, setValue, formState: { errors } } = form;
  const profileId = watch('profileId');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-lg font-semibold text-foreground mb-3">
          Which profile are you hiring as?
          <span className="text-red-500 ml-1">*</span>
        </label>
        <Select
          value={profileId}
          onValueChange={(value) => setValue('profileId', value)}
        >
          <SelectTrigger className={`text-base ${errors.profileId ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Select a profile" />
          </SelectTrigger>
          <SelectContent>
            {clientProfiles.map((profile) => (
              <SelectItem key={profile.id} value={profile.id}>
                {profile.title || profile.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <input
          type="hidden"
          {...register('profileId', { required: 'Please select a profile' })}
        />
        {errors.profileId && (
          <p className="mt-2 text-sm text-destructive">{errors.profileId.message}</p>
        )}
      </div>
      <div>
        <label className="block text-lg font-semibold text-foreground mb-3">
          What is the job title?
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
          <p className="mt-2 text-sm text-destructive">{errors.title.message}</p>
        )}
        <p className="mt-2 text-sm text-muted-foreground">
          Choose a clear, descriptive title that will attract the right freelancers
        </p>
      </div>
    </div>
  );
}
