import { rxRuntime } from '@/services/rx'
import { BackendClient } from '@/services/backend'
import { Effect } from 'effect'

export const signInRx = rxRuntime.rx(
  Effect.fn(function* (_ctx) {
    const { client } = yield* BackendClient

    const res = yield* client.Auth.sendSignInEmail({
      payload: { email: 'test@mail.com' }
    })

    yield* Effect.log(res)
  })
)
