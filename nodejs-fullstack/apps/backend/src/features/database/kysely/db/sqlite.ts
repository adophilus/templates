import { Kysely, sql, SqliteDialect } from 'kysely'
import Database from 'better-sqlite3'
import { AppConfig } from '@/features/config'
import type { KyselyDatabaseTables } from '../tables'
import { getKyselyPlugins } from '../utils'
import { Effect, Layer } from 'effect'
import { KyselyClient } from '../interface'

export const getCreateRawSqliteKyselyClientOptions = (url: string) => {
  const database = new Database(url)

  const dialect = new SqliteDialect({
    database
  })

  return { dialect, plugins: getKyselyPlugins() }
}

export const createRawSqliteKyselyClient = async (
  url: string
): Promise<Kysely<KyselyDatabaseTables>> => {
  const client = new Kysely<KyselyDatabaseTables>(
    getCreateRawSqliteKyselyClientOptions(url)
  )

  await sql`PRAGMA journal_mode=WAL;`.execute(client)
  await sql`PRAGMA foreign_keys = ON;`.execute(client)

  return client
}

export const SqliteKyselyClientLive = Layer.effect(
  KyselyClient,
  Effect.gen(function* () {
    const config = yield* AppConfig
    const client = yield* Effect.promise(() =>
      createRawSqliteKyselyClient(config.db.url)
    )
    return KyselyClient.of(client)
  })
)
