import { KyselyPGlite } from 'kysely-pglite'
import { getKyselyPlugins } from '../utils'
import { Kysely } from 'kysely'
import type { KyselyDatabaseTables } from '../tables'
import { Effect, Layer } from 'effect'
import { KyselyClient } from '../interface'

export const getCreateRawPgliteKyselyClientOptions = async () => {
  const { dialect } = await KyselyPGlite.create('./storage/pglite')

  return { dialect, plugins: getKyselyPlugins() }
}

export const createRawPgliteKyselyClient = async (): Promise<
  Kysely<KyselyDatabaseTables>
> => new Kysely(await getCreateRawPgliteKyselyClientOptions())

export const createPgliteKyselyClient = Layer.effect(
  KyselyClient,
  Effect.promise(async () => {
    const client = await createRawPgliteKyselyClient()
    return KyselyClient.of(client)
  })
)
