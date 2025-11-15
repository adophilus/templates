import { Kysely, sql, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { config } from '@/features/config'
import type { KyselyDatabaseTables } from '../tables'
import { getKyselyPlugins } from '../utils'
import { Effect, Layer } from 'effect'
import { KyselyClient } from '../interface'

export const getCreateRawSqliteKyselyClientOptions = () => {
  const database = new Database(config.db.url)

  const dialect = new SqliteDialect({
    database
  })

  return { dialect, plugins: getKyselyPlugins() }
}

export const createRawSqliteKyselyClient = async (): Promise<
  Kysely<KyselyDatabaseTables>
> => {
  const client = new Kysely<KyselyDatabaseTables>(
    getCreateRawSqliteKyselyClientOptions()
  )

  await sql`PRAGMA journal_mode=WAL;`.execute(client)
  await sql`PRAGMA foreign_keys = ON;`.execute(client)

  return client
}

export const sqliteKyselyClientLive = Layer.effect(
  KyselyClient,
  Effect.promise(async () => {
    const client = await createRawSqliteKyselyClient()
    return KyselyClient.of(client)
  })
)
