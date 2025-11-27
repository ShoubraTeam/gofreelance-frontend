import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | GoFreelance',
  description: 'Sign in or create an account on GoFreelance',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <>{children}</>;
}
