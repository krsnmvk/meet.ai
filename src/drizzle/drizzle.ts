import { DATABASE_URL } from '@/config/app-config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(DATABASE_URL);
export const db = drizzle({ client: sql });
