import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../drizzle/drizzle';
import * as schema from '@/drizzle/schema/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),

  emailAndPassword: {
    enabled: true,
  },
});
