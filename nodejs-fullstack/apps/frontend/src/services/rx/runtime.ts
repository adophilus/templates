import { Effect, Layer, Logger, ManagedRuntime } from 'effect'
import { BackendClientLive } from '../backend'
import { Rx } from '@effect-rx/rx-react'

const memoMap = Effect.runSync(Layer.makeMemoMap)

const MainLayer = Layer.mergeAll(BackendClientLive).pipe(
  Layer.provide(Logger.pretty),
  Layer.tapErrorCause(Effect.logError)
)

export const runtime = ManagedRuntime.make(MainLayer, memoMap)

export const makeRxRuntime = Rx.context({ memoMap })

export const rxRuntime = makeRxRuntime(MainLayer)
