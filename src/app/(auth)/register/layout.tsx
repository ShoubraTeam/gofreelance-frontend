import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Account | GoFreelance',
  description: 'Join GoFreelance today - Create a free account as a client to hire top talent or as a freelancer to find your next project',
  keywords: ['register', 'sign up', 'create account', 'freelancer', 'client', 'GoFreelance'],
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <>{children}</>;
}
