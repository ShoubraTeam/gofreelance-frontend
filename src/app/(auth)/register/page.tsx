'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthContainer } from '../_components/AuthContainer';
import { AuthError } from '../_components/AuthError';
import { AuthFooter } from '../_components/AuthFooter';
import { StepIndicator } from '../_components/StepIndicator';
import { RegistrationStepOne } from '../_components/RegistrationStepOne';
import { RegistrationStepTwo } from '../_components/RegistrationStepTwo';
import { useRegister } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiValidationError } from '@/lib/api/client';
import {
  registrationSchema,
  type RegistrationFormData,
} from '@/lib/types/registration';
import { UserType } from '@/lib/types/auth';

export default function RegisterPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserType | null>(null);
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const setTokens = useAuthStore((state) => state.setTokens);

  const { mutate: register, isPending: isLoading } = useRegister({
    onSuccess: (response) => {
      setTokens(response.data.accessToken, response.data.refreshToken);
      router.push('/onboarding');
    },
    onError: (err) => {
      if (err instanceof ApiValidationError) {
        err.validationErrors.forEach((validationError) => {
          form.setError(validationError.field as keyof RegistrationFormData, {
            type: 'server',
            message: validationError.message,
          });
        });
        setError('Please fix the validation errors below.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
    },
  });

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      gender: undefined,
      birthDate: '',
      country: '',
      timezone: '',
    },
  });

  const handleNextStep = async (): Promise<void> => {
    setError('');

    if (!selectedRole) {
      setError('Please select your account type');
      return;
    }

    const isValid = await form.trigger([
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
    ]);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const handleBackStep = (): void => {
    setError('');
    setCurrentStep(1);
  };

  const handleFinalSubmit = (data: RegistrationFormData): void => {
    setError('');

    if (!selectedRole) {
      setError('Please select your account type');
      return;
    }

    register({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
      birthDate: data.birthDate,
      country: data.country,
      timezone: data.timezone,
      personalPhoto: data.personalPhoto,
      userType: selectedRole,
    });
  };

  return (
    <AuthContainer
      title="Create an account"
      description={
        currentStep === 1
          ? 'Join GoFreelance and start your journey'
          : 'Complete your account'
      }
      maxWidth="lg"
    >
      <StepIndicator currentStep={currentStep} totalSteps={2} />

      <form
        onSubmit={
          currentStep === 1
            ? (e) => {
                e.preventDefault();
                handleNextStep();
              }
            : form.handleSubmit(handleFinalSubmit)
        }
        className="space-y-4"
      >
        <AuthError message={error} />

        {currentStep === 1 ? (
          <RegistrationStepOne
            form={form}
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
            isLoading={isLoading}
            onNext={handleNextStep}
          />
        ) : (
          <RegistrationStepTwo
            form={form}
            isLoading={isLoading}
            onBack={handleBackStep}
          />
        )}
      </form>

      <AuthFooter
        text="Already have an account?"
        linkText="Sign in"
        linkHref="/login"
      />
    </AuthContainer>
  );
}
