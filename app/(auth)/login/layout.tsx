import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | GoFreelance',
  description: 'Sign in to your GoFreelance account to access freelance projects or hire talented professionals',
  keywords: ['login', 'sign in', 'authentication', 'freelance', 'GoFreelance'],
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return <>{children}</>;
}
