import * as z from 'zod';

export const signinSchema = z.object({
  email: z
    .string({ message: 'Email is required' })
    .email({ message: 'Enter a valid email' }),
  password: z
    .string({ message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 haracters long' })
    .trim(),
});

export type SignInSchema = z.infer<typeof signinSchema>;
