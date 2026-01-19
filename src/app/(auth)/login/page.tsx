'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthContainer } from '../_components/AuthContainer';
import { AuthError } from '../_components/AuthError';
import { AuthFooter } from '../_components/AuthFooter';
import { useLogin } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/useAuthStore';
import { ApiValidationError } from '@/lib/api/client';
import { verifyToken } from '@/lib/api/auth';
import { getHomeRoute } from '@/lib/utils';

export default function LoginPage(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { setTokens, setUser } = useAuthStore();

  const { mutate: login, isPending: isLoading } = useLogin({
    onSuccess: async (response) => {
      setTokens(response.data.accessToken, response.data.refreshToken);

      try {
        const userResponse = await verifyToken();
        const user = userResponse.data;
        setUser(user);

        // Navigate based on current user type
        router.push(getHomeRoute(user.currentType));
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        router.push('/');
      }
    },
    onError: (err) => {
      if (err instanceof ApiValidationError) {
        const errorMessages = err.validationErrors
          .map((ve) => ve.message)
          .join('. ');
        setError(errorMessages);
      } else {
        setError(err.message || 'Invalid email or password. Please try again.');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError('');
    login({ username: email, password });
  };

  return (
    <AuthContainer
      title="Welcome back"
      description="Enter your credentials to access your account"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthError message={error} />

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:text-primary/80 hover:underline"
              tabIndex={-1}
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <AuthFooter
        text="Don't have an account?"
        linkText="Sign up"
        linkHref="/register"
      />
    </AuthContainer>
  );
}
