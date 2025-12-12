import { rxRuntime } from '@/services/rx'
import { Effect } from 'effect'
import type { SendSignInEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/'
import type { SendSignUpEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/SendSignUpEmailEndpoint'
import { BackendClient } from '@/services/backend'
import { useRx, useRxSet } from '@effect-rx/rx-react'

export const sendSignInEmailRx = rxRuntime.fn(
  Effect.fn(function* (payload: SignUpRequestBody) {
    const { client } = yield* BackendClient

    return yield* client.Auth.sendSignInEmail({
      payload
    })
  })
)

export const sendSignUpEmailRx = rxRuntime.fn(
  Effect.fn(function* (payload: SignUpRequestBody) {
    const { client } = yield* BackendClient

    return yield* client.Auth.sendSignUpEmail({
      payload
    })
  })
)

export const useSendSignInEmail = () => useRx(sendSignInEmailRx)
export const useSendSignUpEmail = () =>
  useRxSet(sendSignUpEmailRx, { mode: 'promise' })
