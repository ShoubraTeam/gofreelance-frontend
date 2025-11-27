'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthContainer } from '../_components/AuthContainer';
import { AuthError } from '../_components/AuthError';
import { AuthFooter } from '../_components/AuthFooter';
import { StepIndicator } from '../_components/StepIndicator';
import { RegistrationStepOne } from '../_components/RegistrationStepOne';
import { RegistrationStepTwo } from '../_components/RegistrationStepTwo';

type UserRole = 'client' | 'freelancer';

// Complete registration schema
const registrationSchema = z
  .object({
    // Step 1 fields
    firstName: z
      .string()
      .min(1, 'First name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: z.email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    // Step 2 fields
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
        'Invalid phone number format'
      ),
    gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say'], {
      message: 'Please select your gender',
    }),
    birthDate: z
      .string()
      .min(1, 'Birth date is required')
      .refine((date) => {
        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      }, 'You must be at least 18 years old'),
    country: z
      .string()
      .min(1, 'Country is required')
      .min(2, 'Country name must be at least 2 characters'),
    timezone: z.string().optional(),
    personalPhoto: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Single unified form
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

    // Validate role selection
    if (!selectedRole) {
      setError('Please select your account type');
      return;
    }

    // Trigger step 1 fields validation only
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

  const handleFinalSubmit = async (
    data: RegistrationFormData
  ): Promise<void> => {
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement registration API call
      const registrationData = {
        ...data,
        role: selectedRole,
      };
      console.log('Registration attempt:', registrationData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Handle successful registration (redirect, etc.)
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
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
