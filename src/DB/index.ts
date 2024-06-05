import { drizzle } from 'drizzle-orm/postgres-js';
import {eq} from "drizzle-orm"
import type {InferInsertModel} from "drizzle-orm"
import postgres from 'postgres';
import * as schema from './schema';
import {books, users} from './schema';
import { Users } from './models/Users';

// for query purposes
const queryClient = postgres("postgres://postgres:admin@0.0.0.0:5432/test");
const db = drizzle(queryClient, {schema});


export const db_users = new Users(db);


async function insertBooks() {
	type Book = InferInsertModel<typeof books>;
	const booksData : Book[] = [
		{author: "John Cena", title: "My muscles", userId: 1, genre: "lel", isbn: "108-101-30-1004", published_date: "2004-4-28"}
	]
	await db.insert(books).values(booksData);
}


