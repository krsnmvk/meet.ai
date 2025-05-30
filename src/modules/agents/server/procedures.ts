import * as z from 'zod';
import { db } from '@/drizzle/drizzle';
import { agentsTable } from '@/drizzle/schema/schema';
import { createTRPCRouter, protectProcedure } from '@/trpc/init';
import { agentsSchema } from '../validation/agents-schema';
import { eq } from 'drizzle-orm';

export const agentsRouter = createTRPCRouter({
  create: protectProcedure
    .input(agentsSchema)
    .mutation(async ({ input, ctx }) => {
      const [agent] = await db
        .insert(agentsTable)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      return agent;
    }),

  getOne: protectProcedure
    .input(
      z.object({
        id: z.string().min(3),
      })
    )
    .query(async ({ input }) => {
      const [agent] = await db
        .select()
        .from(agentsTable)
        .where(eq(agentsTable.id, input.id));

      return agent;
    }),

  getMany: protectProcedure.query(async () => {
    return await db.select().from(agentsTable);
  }),
});
