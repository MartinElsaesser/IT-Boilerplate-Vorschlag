import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

import pg from "pg";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import { sessions, users } from "./schema";

const pool = new pg.Pool();
const db = drizzle(pool);

const userTable = pgTable("user", {
	id: text("id").primaryKey()
});



const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
