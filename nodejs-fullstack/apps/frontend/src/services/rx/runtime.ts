import { Effect, Layer, Logger, ManagedRuntime } from 'effect'
import { BackendClientLive } from '../backend'
import { Rx } from '@effect-rx/rx-react'
import { FetchHttpClient } from '@effect/platform'

const memoMap = Effect.runSync(Layer.makeMemoMap)

const MainLayer = Layer.mergeAll(BackendClientLive).pipe(
  Layer.provide(FetchHttpClient.layer),
  Layer.provide(Logger.pretty),
  Layer.tapErrorCause(Effect.logError)
)

export const runtime = ManagedRuntime.make(MainLayer, memoMap)

export const makeRxRuntime = Rx.context({ memoMap })

export const rxRuntime = makeRxRuntime(MainLayer)
