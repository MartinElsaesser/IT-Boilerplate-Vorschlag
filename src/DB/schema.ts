import { pgTable, unique, serial, varchar, date, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm/relations";


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	username: varchar("username", {length: 255}).notNull(),
	email: varchar("email", {length: 100}).notNull(),
	password: varchar("password", {length: 100}).notNull(),
})

export const books = pgTable("books", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	author: varchar("author", { length: 255 }).notNull(),
	genre: varchar("genre", { length: 100 }),
	published_date: date("published_date"),
	isbn: varchar("isbn", { length: 20 }).unique(),
	userId: integer("user_id").notNull().references(() => users.id)
});

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	userId: integer("user_id").notNull().references(() => users.id),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull()
});

// relations
export const books_user = relations(books, ({one}) => ({
	user: one(users, {
		fields: [books.userId],
		references: [users.id],
	})
}))

export const user_books = relations(users, ({many}) => ({
	books: many(books)
}))