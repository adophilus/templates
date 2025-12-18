import { Api } from '@nodejs-fullstack-template/api'
import { HttpApiClient, HttpClient, HttpClientRequest } from '@effect/platform'
import { Context, Effect, Layer, Option, Ref, Schedule } from 'effect'
import { FetchHttpClient } from '@effect/platform'
import { Atom } from '@effect-atom/atom-react'
import { authAtom } from '@/components/auth/hooks'

const makeBackendHttpClient = (accessToken?: string) =>
  HttpApiClient.make(Api, {
    baseUrl: 'http://localhost:5000',
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

export const backendClientAtom = Atom.make(
  Effect.fn(function*(ctx: Atom.FnContext) {
    const auth = ctx(authAtom)
    let token: string | undefined
    if (auth.status === 'authenticated') token = auth.token

    return {
      client: yield* makeBackendHttpClient(token).pipe(
        Effect.provide(FetchHttpClient.layer)
      )
    }
  })
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
