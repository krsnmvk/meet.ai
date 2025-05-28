import * as z from 'zod';
import { parseEnv } from 'znv';

export const { DATABASE_URL } = parseEnv(process.env, {
  DATABASE_URL: z.string().url(),
});
