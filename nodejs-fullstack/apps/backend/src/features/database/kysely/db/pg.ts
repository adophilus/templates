import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'
import { config } from '@/features/config'
import type { KyselyDatabaseTables } from '../tables'
import { getKyselyPlugins } from '../utils'
import { KyselyClient } from '../interface'
import { Effect, Layer } from 'effect'

const { Pool } = pg

export const getCreateRawPgKyselyClientOptions = () => {
  const pool = new Pool({
    connectionString: config.db.url
  })

  const dialect = new PostgresDialect({
    pool
  })

  return { dialect, plugins: getKyselyPlugins() }
}

export const createRawPgKyselyClient = async (): Promise<
  Kysely<KyselyDatabaseTables>
> => new Kysely(getCreateRawPgKyselyClientOptions())

export const createPgKyselyClient = Layer.effect(
  KyselyClient,
  Effect.promise(async () => {
    const client = await createRawPgKyselyClient()
    return KyselyClient.of(client)
  })
)
