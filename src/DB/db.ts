import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { DB } from './schema/types';

export const pool = new Pool({
	database: "test",
	password: "admin",
	user: "postgres",
	host: "localhost",
	port: 5432,
	max: 10,
});

const dialect = new PostgresDialect({
	pool
});

export const db = new Kysely<DB>({
	dialect,
});