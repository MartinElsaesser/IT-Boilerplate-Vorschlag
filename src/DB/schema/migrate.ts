import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
	Kysely,
	Migrator,
	PostgresDialect,
	FileMigrationProvider,
} from 'kysely'

const db = new Kysely<any>({
	dialect: new PostgresDialect({
		pool: new Pool({
			database: 'test',
			host: 'localhost',
			user: 'postgres',
			password: "admin",
			port: 5432,
			max: 10,
		}),
	}),
});

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		path,
		// This needs to be an absolute path.

		migrationFolder: path.join(__dirname, 'migrations'),
	}),
})

async function migrateToLatest() {
	const { error, results } = await migrator.migrateToLatest();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`)
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`)
		}
	})

	if (error) {
		console.error('failed to migrate')
		console.error(error)
		process.exit(1)
	}

}

async function migrateDown() {
	const { error, results } = await migrator.migrateDown();

	results?.forEach((it) => {
		if (it.status === 'Success') {
			console.log(`migration "${it.migrationName}" was executed successfully`)
		} else if (it.status === 'Error') {
			console.error(`failed to execute migration "${it.migrationName}"`)
		}
	})

	if (error) {
		console.error('failed to migrate')
		console.error(error)
		process.exit(1)
	}

}

void async function main() {
	await migrateDown();
	await migrateToLatest();
	await db.destroy()
}()