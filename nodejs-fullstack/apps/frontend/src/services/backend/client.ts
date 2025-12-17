import { Api } from '@nodejs-fullstack-template/api'
import { HttpApiClient, HttpClient, HttpClientRequest } from '@effect/platform'
import { Context, Effect, Layer, Option, Schedule } from 'effect'

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

export type BackendHttpClient = Effect.Effect.Success<
  ReturnType<typeof makeBackendHttpClient>
>

export class BackendClient extends Context.Tag('BackendClient')<
  BackendClient,
  { client: BackendHttpClient }
>() {}

export const BackendClientLive = Layer.effect(
  BackendClient,
  Effect.gen(function* () {
    const client = yield* makeBackendHttpClient('')
    return { client }
  })
)
