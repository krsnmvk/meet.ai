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
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Loader2Icon, OctagonAlertIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { authClient } from '@/better-auth/auth-client';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signupSchema, SignUpSchema } from '../../validation/sign-up-schema';

export default function SignUpForm() {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  function onSubmit(values: SignUpSchema) {
    setError(null);
    setIsPending(true);

    authClient.signUp.email(
      {
        name: values.name,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 md:p-8">
        <div className="flex flex-col gap-6 mb-3">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-medium">Let&apos;s get started</h3>
            <p className="text-muted-foreground">Create your account</p>
          </div>
        </div>
        <div className="grid gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    type="text"
                    placeholder="jhon example"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
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
                    disabled={isPending}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
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
            disabled={isPending}
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
              Already have an account?
            </span>{' '}
            <Link
              href="/sign-in"
              className={cn(
                'underline text-blue-500',
                isPending && 'pointer-events-none'
              )}
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
