import { Hono } from "hono";
import { serve } from '@hono/node-server'
import { lucia } from "./DB/lucia-auth";
import { getCookie, setCookie } from "hono/cookie";
import { csrf } from "hono/csrf";
import { hash } from "@node-rs/argon2";


import type { User, Session } from "lucia";
import { db } from "./DB/db";

const app = new Hono<{
	Variables: {
		user: User | null;
		session: Session | null;
	};
}>();

// see https://hono.dev/middleware/builtin/csrf for more options
// app.use(csrf());


app.use("*", async (c, next) => {
	const sessionId = getCookie(c, lucia.sessionCookieName) ?? null;
	if (!sessionId) {
		c.set("user", null);
		c.set("session", null);
		return next();
	}
	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		// use `header()` instead of `setCookie()` to avoid TS errors
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
			append: true
		});
	}
	if (!session) {
		c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), {
			append: true
		});
	}
	c.set("user", user);
	c.set("session", session);
	return next();
});


app.post("/signup", async (c) => {
	const formData = await c.req.formData();
	console.log(formData)

	const email = formData.get("email");
	// TODO: validate Email
	if (!email || typeof email !== "string") {
		return c.body("Invalid email", 400);
	}
	const password = formData.get("password");
	if (!password || typeof password !== "string" || password.length < 6) {
		return c.body("Invalid password", 400);
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	try {
		const result = await db
			.insertInto("user")
			.values({
				email,
				password: passwordHash,
			})
			.returning(["id"])
			.executeTakeFirst();
		

		const session = await lucia.createSession(result!.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), {
			append: true
		});
		return c.body("Logged In")
	} catch(e){
		// db error, email taken, etc
		console.log(e)
		return c.body("error", 400);
	}
});






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
