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

const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Minimum 6 characters')
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (values: RegisterValues) => {
    try {
      const response = await api.post('/auth/register', values);
      login(response.data.data.token, response.data.data.user);
      router.push('/dashboard');
    } catch (error: any) {
      setError('root', { message: error.response?.data?.message || 'Registration failed' });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md p-6">
        <h1 className="mb-1 text-2xl font-semibold">Register</h1>
        <p className="mb-6 text-sm text-text/60">Create your secure PrimeTrade account</p>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Name" type="text" error={errors.name?.message} {...register('name')} />
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
          {errors.root?.message ? <p className="text-sm text-red-400">{errors.root.message}</p> : null}
          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
        <p className="mt-4 text-sm text-text/60">
          Already registered?{' '}
          <Link href="/login" className="text-neon">
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}
