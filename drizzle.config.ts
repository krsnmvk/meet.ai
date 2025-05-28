import { DATABASE_URL } from '@/config/app-config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/drizzle/schema/schema.ts',
  out: './src/drizzle/migrations',
  dbCredentials: {
    url: DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
