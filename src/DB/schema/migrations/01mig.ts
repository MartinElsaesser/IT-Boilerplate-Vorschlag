import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('user')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('email', 'varchar(50)', (col) => col.notNull().unique())
    .addColumn('password', 'varchar(50)', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo(sql`now()`).notNull())
    .execute()

  await db.schema
    .createTable('session')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('user_id', 'integer', (col) => col.references("user.id").onDelete("cascade").notNull())
    .addColumn('expires_at', 'timestamptz', (col) => col.notNull())
    .execute()

  await db.schema
    .createTable('book')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('name', 'varchar(50)', (col) => col.notNull().unique())
    .addColumn('user', 'integer', (col) =>
      col.references('user.id').onDelete('cascade').notNull()
    )
    .execute()
	
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('session').execute()
  await db.schema.dropTable('book').execute()
  await db.schema.dropTable('user').execute()
}