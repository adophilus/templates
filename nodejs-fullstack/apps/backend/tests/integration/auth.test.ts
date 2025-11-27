import { it } from '@effect/vitest'
import { Effect } from 'effect'
import { ApiClient } from '../utils'
import { FetchHttpClient } from '@effect/platform'

it.effect('should send the sign up email', () =>
  Effect.gen(function* () {
    const client = yield* ApiClient

    const res = yield* client.Auth.sendSignUpEmail({
      payload: {
        full_name: 'Mary Slessor',
        email: 'mary.slessor@mail.com'
      }
    })

    console.log(res)
  }).pipe(Effect.provide(FetchHttpClient.layer))
)
