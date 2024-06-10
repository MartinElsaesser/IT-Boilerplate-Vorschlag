import { db } from "../db";
import type { User } from "../schema/types";

const users = [
	{email: "mark.twain@gmail.com", password: "test"}
]

void async function() {
	const lel = await db.insertInto("user").values(users).execute()
	console.log(lel);
	
}()
