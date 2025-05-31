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

export const agentsUpdateSchema = agentsSchema.extend({
  id: z.string().min(1, { message: 'ID must be at least 1 haracters long' }),
});

export type AgentsSchema = z.infer<typeof agentsSchema>;
