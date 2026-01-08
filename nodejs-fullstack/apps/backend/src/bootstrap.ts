import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { NodeHttpServer } from '@effect/platform-node'
import { Api } from '@nodejs-fullstack-template/api'
import { createServer } from 'node:http'
import StorageApiLive from './features/storage/route'
import { Console, Data, Effect, Layer } from 'effect'
import { StorageServiceLive } from './features/storage/service'
import { KyselyStorageRepositoryLive } from './features/storage/repository'
import { SqliteKyselyClientLive } from './features/database/kysely/db/sqlite'
import { DevTools } from '@effect/experimental'
import AuthApiLive from './features/auth/route'
import {
  KyselyAuthSessionRepositoryLive,
  KyselyAuthTokenRepositoryLive,
  KyselyAuthUserRepositoryLive
} from './features/auth/repository'
import { createKyselyMigrator } from './features/database/kysely/migrator'
import { KyselyClient } from './features/database/kysely'
import { NO_MIGRATIONS, type MigrationResultSet } from 'kysely'
import { NodemailerMailerLive } from './features/mailer/service'
import { AuthenticationMiddlewareLive } from './features/auth/middleware/AuthenticationMiddleware'
// import { AuthCronJob } from './features/auth/cron'
import { AuthSessionServiceLive } from './features/auth/service/session/live'
import { AppConfigLive, AppConfig, EnvLive } from './features/config'

export class DatabaseMigrationFailedError extends Data.TaggedError(
  'DatabaseMigrationFailedError'
)<{
  cause: unknown
}> {}

export const DatabaseClientLayer = SqliteKyselyClientLive

const checkMigrationResultSet = (rs: MigrationResultSet) =>
  rs.error ? Effect.fail(rs.error) : Effect.void

export const DatabaseMigrationLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const client = yield* KyselyClient
    const config = yield* AppConfig

    const migrator = createKyselyMigrator(client, config.db.migrationsFolder)

    // yield* Effect.tryPromise({
    //   try: () => migrator.migrateTo(NO_MIGRATIONS),
    //   catch: (err) => new DatabaseMigrationFailedError({ cause: err })
    // }).pipe(Effect.flatMap(checkMigrationResultSet))

    yield* Effect.tryPromise({
      try: () => migrator.migrateToLatest(),
      catch: (err) => new DatabaseMigrationFailedError({ cause: err })
    }).pipe(Effect.flatMap(checkMigrationResultSet))
    yield* Console.log('Ran all migrations')
  })
).pipe(Layer.provide(DatabaseClientLayer))

export const DatabaseLayer = Layer.merge(
  DatabaseMigrationLayer,
  DatabaseClientLayer
)

export const MailerLayer = NodemailerMailerLive

export const AuthLayer = AuthSessionServiceLive.pipe(
  Layer.provideMerge(KyselyAuthUserRepositoryLive),
  Layer.provideMerge(KyselyAuthTokenRepositoryLive),
  Layer.provideMerge(KyselyAuthSessionRepositoryLive)
)

export const StorageLayer = StorageServiceLive.pipe(
  Layer.provideMerge(KyselyStorageRepositoryLive)
)

export const ApiLive = HttpApiBuilder.api(Api).pipe(
  Layer.provide(AuthApiLive),
  Layer.provide(StorageApiLive),
  Layer.provide(AuthenticationMiddlewareLive),
  Layer.provide(AuthLayer),
  Layer.provide(StorageLayer),
  Layer.provide(MailerLayer),
  Layer.provide(DatabaseLayer)
)

export const DevToolsLive = DevTools.layer()

export const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(ApiLive),
  HttpServer.withLogAddress,
  Layer.provide(
    Layer.unwrapEffect(
      Effect.gen(function* () {
        const config = yield* AppConfig
        return NodeHttpServer.layer(createServer, { port: config.server.port })
      })
    )
  ),
  Layer.provide(DevToolsLive)
)
