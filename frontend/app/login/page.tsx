'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/axios';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const loginSchema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Minimum 6 characters')
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (values: LoginValues) => {
    try {
      const response = await api.post('/auth/login', values);
      login(response.data.data.token, response.data.data.user);
      router.push('/dashboard');
    } catch (error: any) {
      setError('root', { message: error.response?.data?.message || 'Login failed' });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="mb-1 text-2xl font-semibold">Login</h1>
        <p className="mb-6 text-sm text-text/60">Access your PrimeTrade dashboard</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
          {errors.root?.message ? <p className="text-sm text-red-400">{errors.root.message}</p> : null}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-text/60">
          No account?{' '}
          <Link href="/register" className="text-neon">
            Register
          </Link>
        </p>
      </Card>
    </main>
  );
}
