import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform'
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { createServer } from 'node:http'
import storageApiLive from './features/storage/route'
import { Layer } from 'effect'
import { sqliteStorageLive } from './features/storage/service'
import { kyselyStorageRepositoryLive } from './features/storage/repository'
import { sqliteKyselyClientLive } from './features/database/kysely/db/sqlite'

const apiLive = HttpApiBuilder.api(Api).pipe(
  Layer.provide(storageApiLive),
  Layer.provide(sqliteStorageLive),
  Layer.provide(kyselyStorageRepositoryLive),
  Layer.provide(sqliteKyselyClientLive)
)

const httpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(HttpApiBuilder.middlewareCors()),
  Layer.provide(apiLive),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 5000 }))
)

NodeRuntime.runMain(Layer.launch(httpLive))
