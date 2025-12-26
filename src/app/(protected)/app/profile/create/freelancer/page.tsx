'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createFreelancerProfile, getSpecializations } from '@/lib/api/profile';
import type { CreateFreelancerProfileRequest } from '@/lib/types/profile';
import { ProfileFormHeader } from '../_components/ProfileFormHeader';
import { TitleField } from '../_components/TitleField';
import { SpecializationField } from '../_components/SpecializationField';
import { BioField } from '../_components/BioField';
import { FormError } from '../_components/FormError';
import { SubmitButton } from '../_components/SubmitButton';

export default function CreateFreelancerProfilePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateFreelancerProfileRequest>();

  const { data: specializationsData, isLoading: isLoadingSpecializations } =
    useQuery({
      queryKey: ['specializations'],
      queryFn: getSpecializations,
    });

  const createProfileMutation = useMutation({
    mutationFn: createFreelancerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast.success('Profile created successfully!');
      router.push('/app/find-work');
    },
  });

  const onSubmit = (data: CreateFreelancerProfileRequest) => {
    createProfileMutation.mutate(data);
  };

  const specializations = specializationsData?.data || [];
  const titleValue = watch('title', '');
  const titleLength = titleValue.length;
  const bioValue = watch('bio', '');
  const bioLength = bioValue.length;

  if (isLoadingSpecializations) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading specializations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <ProfileFormHeader
            type="freelancer"
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            title="Create Your Freelancer Profile"
            description="Tell us about your expertise and what you're looking for"
            gradientClass="bg-linear-to-r from-primary to-secondary"
          />

          <form
            className="px-8 py-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TitleField
              register={register}
              errors={errors}
              titleLength={titleLength}
            />

            <SpecializationField
              register={register}
              errors={errors}
              specializations={specializations}
            />

            <BioField
              register={register}
              errors={errors}
              bioLength={bioLength}
              placeholder="Tell us about your skills, experience, and what kind of projects you're looking for..."
            />

            <FormError show={!!createProfileMutation.error} />

            <SubmitButton
              isPending={createProfileMutation.isPending}
              gradientClass="bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
