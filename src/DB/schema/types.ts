import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Book {
  id: Generated<number>;
  name: string;
  user: number;
}

export interface Session {
  expires_at: Timestamp;
  id: string;
  user_id: number;
}

export interface User {
  created_at: Generated<Timestamp>;
  email: string;
  id: Generated<number>;
  password: string;
}

export interface DB {
  book: Book;
  session: Session;
  user: User;
}
