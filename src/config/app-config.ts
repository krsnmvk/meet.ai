import * as z from 'zod';
import { parseEnv } from 'znv';

export const { DATABASE_URL, BETTER_AUTH_SECRET } = parseEnv(process.env, {
  DATABASE_URL: z.string().url(),
  BETTER_AUTH_URL: z.string().url(),
  BETTER_AUTH_SECRET: z.string().min(1),
});
