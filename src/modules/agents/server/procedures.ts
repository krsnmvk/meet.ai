import { db } from '@/drizzle/drizzle';
import { agents } from '@/drizzle/schema/schema';
import { baseProcedure, createTRPCRouter } from '@/trpc/init';

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    return await db.select().from(agents);
  }),
});
