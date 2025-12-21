import { Api } from '@nodejs-fullstack-template/api'
import { HttpApiClient, HttpClient, HttpClientRequest } from '@effect/platform'
import { Effect, Layer, Logger, Option, Schedule } from 'effect'
import { FetchHttpClient } from '@effect/platform'
import { Atom } from '@effect-atom/atom-react'
import { authAtom } from '@/components/auth/hooks'
import { AppConfig, AppConfigLive, EnvLive } from '../config'
import { makeAtomRuntime } from '../atom'

const makeBackendHttpClient = (baseUrl: string, accessToken?: string) =>
  HttpApiClient.make(Api, {
    baseUrl,
    transformClient: (client) =>
      client.pipe(
        HttpClient.mapRequest((request) =>
          Option.fromNullable(accessToken).pipe(
            Option.map((accessToken) =>
              request.pipe(HttpClientRequest.bearerToken(accessToken))
            ),
            Option.getOrElse(() => request)
          )
        ),
        HttpClient.retryTransient({
          times: 3,
          schedule: Schedule.exponential('100 millis')
        })
      )
  })

export const backendClientAtom = Atom.make((ctx: Atom.FnContext) =>
  Effect.gen(function* () {
    const auth = ctx(authAtom)
    const config = yield* AppConfig

    let token: string | undefined
    if (auth.status === 'authenticated') token = auth.token

    return {
      client: yield* makeBackendHttpClient(config.server.url, token).pipe(
        Effect.provide(FetchHttpClient.layer)
      )
    }
  }).pipe(Effect.provide(AppConfigLive), Effect.provide(EnvLive))
)

// export type BackendHttpClient = Effect.Effect.Success<
//   ReturnType<typeof makeBackendHttpClient>
// >

// export class BackendClient extends Context.Tag('BackendClient')<
//   BackendClient,
//   {
//     client: Ref.Ref<BackendHttpClient>
//     update: (token: string) => Effect.Effect<void>
//   }
// >() {}
//
// export const BackendClientLive = Layer.effect(
//   BackendClient,
//   Effect.gen(function* () {
//     const client = yield* Ref.make(yield* makeBackendHttpClient(''))
//
//     return {
//       client,
//       update: (token: string) =>
//         Effect.gen(function* () {
//           const newBackendClient = yield* makeBackendHttpClient(token)
//           yield* Ref.set(client, newBackendClient)
//         }).pipe(Effect.provide(FetchHttpClient.layer))
//     }
//   })
// ).pipe(Layer.provide(FetchHttpClient.layer))
