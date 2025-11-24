import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { createServer } from 'node:http'
import StorageApiLive from './features/storage/route'
import { Layer } from 'effect'
import { SqliteStorageLive } from './features/storage/service'
import { KyselyStorageRepositoryLive } from './features/storage/repository'
import { SqliteKyselyClientLive } from './features/database/kysely/db/sqlite'
import { DevTools } from '@effect/experimental'
import AuthApiLive from './features/auth/route'
import { KyselyAuthUserRepositoryLive } from './features/auth/repository'

const AuthLayer = AuthApiLive.pipe(Layer.provide(KyselyAuthUserRepositoryLive))

const StorageLayer = StorageApiLive.pipe(
  Layer.provide(SqliteStorageLive),
  Layer.provide(KyselyStorageRepositoryLive)
)

const ApiLive = HttpApiBuilder.api(Api).pipe(
  Layer.provide(AuthLayer),
  Layer.provide(StorageLayer),
  Layer.provide(SqliteKyselyClientLive)
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
