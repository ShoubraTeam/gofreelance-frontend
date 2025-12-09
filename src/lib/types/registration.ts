import { z } from 'zod';

export const registrationSchema = z
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
    gender: z.enum(['MALE', 'FEMALE'], {
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
    timezone: z.string().min(1, 'Timezone is required'),
    personalPhoto: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;
