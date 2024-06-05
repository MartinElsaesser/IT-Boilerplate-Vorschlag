import 'dotenv/config';
import { defineConfig } from 'drizzle-kit'

console.log(process.env.DB_URL);

export default defineConfig({
	schema: "./src/DB/schema.ts",
	out: "./src/DB/migrations",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
})