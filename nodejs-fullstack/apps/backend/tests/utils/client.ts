import { HttpApiClient, HttpClient, HttpClientRequest } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { Option } from 'effect'

export const makeApiClient = (accessToken?: string) =>
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
        )
      )
  })

export type ApiClient = ReturnType<typeof makeApiClient>
