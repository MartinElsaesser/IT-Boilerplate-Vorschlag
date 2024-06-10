import { Hono } from "hono";
import { serve } from '@hono/node-server'
import { lucia } from "./DB/lucia-auth";
import { getCookie, setCookie } from "hono/cookie";
import { csrf } from "hono/csrf";

import type { User, Session } from "lucia";
import { db } from "./DB/db";

const app = new Hono<{
	Variables: {
		user: User | null;
		session: Session | null;
	};
}>();

// see https://hono.dev/middleware/builtin/csrf for more options
app.use(csrf());

app.use("*", async (c, next) => {
	const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;

	if (!sessionId) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}
	const { session, user } = await lucia.validateSession(sessionId);

	// refresh session cookie, if session is still valid
	if (session && session.fresh) {
		// use `header()` instead of `setCookie()` to avoid TS errors
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
	}

	// init a blank session if none is present
	if (!session) {
		c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize());
	}

	// populate user and session from database
	c.set("user", user);
	c.set("session", session);
	return next();
});

app.post("/login", async(c)=> {
	// validate input
	// get user from DB
	// check passwords
	// - password valid
	//   create session and save user to it
	// - password invalid
	//   return error message
})

app.post("/set-cookie", async (c) => {

	const sessionUser = c.get("user");
	const user = await db.selectFrom("user").selectAll().where("id", "=", 1).executeTakeFirst();
	const session = await lucia.createSession(user!.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	setCookie(c, sessionCookie.name, sessionCookie.value, sessionCookie.attributes);


	return c.body(`Session initialized for user ${user?.email}`)
})

app.get("/get-cookie", async (c) => {
	const user = c.get("user");
	console.log(user)
	return c.html("test");
});



// spin up server
serve(
	{fetch: app.fetch, port: 3000},
	(info) => {
		const address = info.address === "0.0.0.0" ? "localhost" : info.address
		console.log(`Server started: http://${address}:${info.port}`);
	}
);
