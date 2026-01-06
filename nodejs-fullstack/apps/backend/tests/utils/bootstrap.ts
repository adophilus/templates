import { ApiLive } from '@/app'
import { AppConfigLive, EnvLive } from '@/features/config'
import { HttpApiBuilder } from '@effect/platform'
import { NodeHttpServer } from '@effect/platform-node'
import { Layer } from 'effect'

export const TestLive = HttpApiBuilder.serve().pipe(
  Layer.provide(ApiLive),
  Layer.provide(AppConfigLive),
  Layer.provide(EnvLive),
  Layer.provideMerge(NodeHttpServer.layerTest)
)
