import { SqliteKyselyClientLive } from '@/features/database/kysely/db/sqlite'
import { defineConfig } from 'kysely-ctl'
import { Effect, Layer } from 'effect'
import { KyselyClient } from '@/features/database/kysely'
import { AppConfigLive, EnvLive } from '@/features/config'

const RequirementsLayer = SqliteKyselyClientLive.pipe(
  Layer.provide(AppConfigLive),
  Layer.provide(EnvLive)
)

const getConfig = () =>
  Effect.gen(function* () {
    const client = yield* KyselyClient

    return defineConfig({
      kysely: client
    })
  }).pipe(Effect.provide(RequirementsLayer), Effect.runPromise)

const config = await getConfig()

export default config
