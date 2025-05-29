'use client';

import { useState } from 'react';

import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { signinSchema, SignInSchema } from '../../validation/sign-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2Icon, OctagonAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/better-auth/auth-client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function SignInForm() {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [sosialPending, setSosialPending] = useState(false);

  async function onSubmit(values: SignInSchema) {
    setError(null);
    setIsPending(true);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          setIsPending(false);
          router.push('/');
        },
        onError: (err) => {
          setIsPending(false);
          setError(err.error.message);
        },
      }
    );
  }

  async function onSosials(provider: 'google' | 'github') {
    setError(null);
    setSosialPending(true);

    await authClient.signIn.social(
      {
        provider: provider,
        callbackURL: '/',
      },
      {
        onSuccess: () => {
          setIsPending(false);
        },
        onError: (err) => {
          setIsPending(false);
          setError(err.error.message);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 md:p-8">
        <div className="flex flex-col gap-6 mb-3">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-medium">Welcome back</h3>
            <p className="text-muted-foreground">Login to your account</p>
          </div>
        </div>
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending || sosialPending}
                    type="text"
                    placeholder="jhon@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending || sosialPending}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!error && (
            <Alert className="bg-destructive/10 border-none">
              <OctagonAlertIcon className="size-5 !text-destructive" />
              <AlertTitle className="text-destructive">{error}</AlertTitle>
            </Alert>
          )}
          <Button
            disabled={isPending || sosialPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            {isPending && (
              <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
            )}
            <span>Login</span>
          </Button>
          <p className="text-sm">
            <span className="text-muted-foreground">
              Don&apos;t have an account?
            </span>{' '}
            <Link
              href="/sign-up"
              className={cn(
                'underline text-blue-500',
                (isPending || sosialPending) && 'pointer-events-none'
              )}
            >
              Sign up
            </Link>
          </p>
          <div className="relative text-center text-sm after:border-border after:flex after:items-center after:inset-0 after:border-t after:absolute after:top-1/2 after:z-0">
            <span className="bg-card z-10 text-muted-foreground relative px-2">
              or continue with
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Button
              disabled={isPending || sosialPending}
              type="button"
              onClick={() => onSosials('google')}
              variant="outline"
              className="w-full"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
            </Button>
            <Button
              disabled={isPending || sosialPending}
              type="button"
              onClick={() => onSosials('github')}
              variant="outline"
              className="w-full"
            >
              <Image src="/github.svg" alt="Google" width={20} height={20} />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
