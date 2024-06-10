import { Lucia, TimeSpan } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import { db, pool } from "./db";
import { User } from "./schema/types";


const adapter = new NodePostgresAdapter(pool, {user: "user", session: "session"});


export const lucia = new Lucia(adapter, {
	sessionCookie: {
		name: "session",
		expires: true,
		attributes: {
			// set to `true` when using HTTPS
			secure: true,
		}
	},
	sessionExpiresIn: new TimeSpan(30, "d"),
	getUserAttributes(dbUser) {
		return {
			email: dbUser.email,
			created_at: dbUser.created_at,
			id: dbUser.id,
		}
	}
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		UserId: number;
		DatabaseUserAttributes: DataBaseUserAttributes
	}
}

type DataBaseUserAttributes = Omit<User, "password">;
