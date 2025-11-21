import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { createServer } from 'node:http'
import StorageApiLive from './features/storage/route'
import { Layer } from 'effect'
import { sqliteStorageLive } from './features/storage/service'
import { kyselyStorageRepositoryLive } from './features/storage/repository'
import { sqliteKyselyClientLive } from './features/database/kysely/db/sqlite'
import { DevTools } from '@effect/experimental'

const ApiLive = HttpApiBuilder.api(Api).pipe(
  Layer.provide(StorageApiLive),
  Layer.provide(sqliteStorageLive),
  Layer.provide(kyselyStorageRepositoryLive),
  Layer.provide(sqliteKyselyClientLive)
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
