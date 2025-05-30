import * as z from 'zod';

export const agentsSchema = z.object({
  name: z
    .string({ message: 'Name is required' })
    .min(3, { message: 'Intructions must be at least 3 haracters long' }),
  intructions: z
    .string({ message: 'Intructions is required' })
    .min(3, { message: 'Intructions must be at least 3 haracters long' })
    .trim(),
});

export type AgentsSchema = z.infer<typeof agentsSchema>;
