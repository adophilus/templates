import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'
import type { KyselyDatabaseTables } from '../tables'
import { getKyselyPlugins } from '../utils'
import { KyselyClient } from '../interface'
import { Effect, Layer } from 'effect'
import { AppConfig } from '@/features/config'

const { Pool } = pg

export const getCreateRawPgKyselyClientOptions = (url: string) => {
  const pool = new Pool({
    connectionString: url
  })

  const dialect = new PostgresDialect({
    pool
  })

  return { dialect, plugins: getKyselyPlugins() }
}

export const createRawPgKyselyClient = async (
  url: string
): Promise<Kysely<KyselyDatabaseTables>> =>
  new Kysely(getCreateRawPgKyselyClientOptions(url))

export const createPgKyselyClient = Layer.effect(
  KyselyClient,
  Effect.gen(function* () {
    const config = yield* AppConfig
    const client = yield* Effect.promise(() =>
      createRawPgKyselyClient(config.db.url)
    )
    return KyselyClient.of(client)
  })
)
