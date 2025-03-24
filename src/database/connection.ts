import { join } from 'node:path'
import sqlite3 from 'better-sqlite3'
import { Kysely, SqliteDialect } from 'kysely'
import type { DatabaseSchema } from './types'

export default function getConnection() {
  const dbFile = process.env.DB_FILE
  if (!dbFile) {
    throw new Error('Not found DB_FILE env variable')
  }
  const dbPath = join(import.meta.dirname, '..', '..', dbFile)
  try {
    const dialect = new SqliteDialect({
      database: new sqlite3(dbPath)
    })
    return new Kysely<DatabaseSchema>({ dialect })
  } catch (error) {
    console.error(error)
    throw new Error('Couldn\'t establish connection with a database')
  }
}
