import * as z from 'zod';

export const signupSchema = z
  .object({
    name: z
      .string({ message: 'Name is required' })
      .min(3, { message: 'Name must be at least 3 characters long' })
      .trim(),
    email: z
      .string({ message: 'Email is required' })
      .email({ message: 'Enter a valid email' }),
    password: z
      .string({ message: 'Password is required' })
      .min(6, { message: 'Password must be at least 6 haracters long' })
      .trim(),
    confirmPassword: z.string().trim().optional(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'],
  });

export type SignUpSchema = z.infer<typeof signupSchema>;
