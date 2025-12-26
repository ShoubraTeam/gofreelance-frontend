'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createClientProfile } from '@/lib/api/profile';
import type { CreateClientProfileRequest } from '@/lib/types/profile';
import { ProfileFormHeader } from '../_components/ProfileFormHeader';
import { CompanyNameField } from '../_components/CompanyNameField';
import { BioField } from '../_components/BioField';
import { FormError } from '../_components/FormError';
import { SubmitButton } from '../_components/SubmitButton';

export default function CreateClientProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateClientProfileRequest>();

  const createProfileMutation = useMutation({
    mutationFn: createClientProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast.success('Profile created successfully!');
      router.push('/app/hire-talent');
    },
  });

  const onSubmit = (data: CreateClientProfileRequest) => {
    createProfileMutation.mutate(data);
  };

  const bioValue = watch('bio', '');
  const bioLength = bioValue.length;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <ProfileFormHeader
            type="client"
            icon={
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            }
            title="Create Your Client Profile"
            description="Tell us about your company and what you're looking for"
            gradientClass="bg-linear-to-r from-primary to-primary/80"
          />

          <form
            className="px-8 py-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CompanyNameField register={register} errors={errors} />

            <BioField
              register={register}
              errors={errors}
              bioLength={bioLength}
              placeholder="Tell us about your company, the type of projects you work on, and what you're looking for in freelancers..."
            />

            <FormError show={!!createProfileMutation.error} />

            <SubmitButton
              isPending={createProfileMutation.isPending}
              gradientClass="bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
