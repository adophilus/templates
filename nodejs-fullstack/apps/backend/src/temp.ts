import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { createServer } from 'node:http'
import StorageApiLive from './features/storage/route'
import { Console, Data, Effect, Layer } from 'effect'
import { SqliteStorageLive } from './features/storage/service'
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
import { config } from './features/config'
import { NodemailerMailerLive } from './features/mailer/service'
import { AuthenticationMiddlewareLive } from './features/auth/middleware/AuthenticationMiddleware'

class DatabaseMigrationFailedError extends Data.TaggedError(
  'DatabaseMigrationFailedError'
)<{
  cause: unknown
}> {}

const DatabaseClientLayer = SqliteKyselyClientLive

const checkMigrationResultSet = (rs: MigrationResultSet) =>
  rs.error ? Effect.fail(rs.error) : Effect.void

const DatabaseMigrationLayer = Layer.effectDiscard(
  Effect.gen(function* () {
    const client = yield* KyselyClient

    const migrator = createKyselyMigrator(client, config.db.migrationsFolder)

    yield* Effect.tryPromise({
      try: () => migrator.migrateTo(NO_MIGRATIONS),
      catch: (err) => new DatabaseMigrationFailedError({ cause: err })
    }).pipe(Effect.flatMap(checkMigrationResultSet))
    yield* Console.log('Rolled back migrations')

    yield* Effect.tryPromise({
      try: () => migrator.migrateToLatest(),
      catch: (err) => new DatabaseMigrationFailedError({ cause: err })
    }).pipe(Effect.flatMap(checkMigrationResultSet))
    yield* Console.log('Ran all migrations')
  })
).pipe(Layer.provide(DatabaseClientLayer))

const DatabaseLayer = Layer.merge(DatabaseMigrationLayer, DatabaseClientLayer)

const MailerLayer = NodemailerMailerLive

const AuthLayer = AuthApiLive.pipe(
  Layer.provide(AuthenticationMiddlewareLive),
  Layer.provide(KyselyAuthUserRepositoryLive),
  Layer.provide(KyselyAuthTokenRepositoryLive),
  Layer.provide(KyselyAuthSessionRepositoryLive)
)

const StorageLayer = StorageApiLive.pipe(
  Layer.provide(SqliteStorageLive),
  Layer.provide(KyselyStorageRepositoryLive)
)

const ApiLive = HttpApiBuilder.api(Api).pipe(
  Layer.provide(AuthLayer),
  Layer.provide(StorageLayer),
  Layer.provide(MailerLayer),
  Layer.provide(DatabaseLayer)
)

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(ApiLive),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 5000 }))
)

const DevToolsLive = DevTools.layer()

const AppLive = HttpLive.pipe(Layer.provide(DevToolsLive))

NodeRuntime.runMain(Layer.launch(AppLive))
