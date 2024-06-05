import type {InferInsertModel, InferSelectModel} from "drizzle-orm"
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js"
import {books, users} from '../schema';
import * as schema from '../schema';


type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type User = InferInsertModel<typeof users>;



export class Users {
	db: PostgresJsDatabase<typeof schema>;

	constructor(db: PostgresJsDatabase<typeof schema>) {
		this.db = db;
	}

	async insertMany() {
		const usersData : User[] = [
			{username:  "JohnCena", email: "john.cena@gmail.com", password: "test"},
			{username:  "Fred", email: "fred@gmail.com", password: "test"},
		]
		await this.db.insert(users).values(usersData);
	}

	async findManyPopulateBooks() {
		return await this.db.query.users.findMany({
			with: {
				
			}
		})
	}
}


