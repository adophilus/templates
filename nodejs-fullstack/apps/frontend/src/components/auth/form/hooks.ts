import { rxRuntime } from '@/services/rx'
import { Effect } from 'effect'
import { BackendClient } from '@/services/backend'
import { useRxSet } from '@effect-rx/rx-react'
import type { SendSignInEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/SendSignInEmailEndpoint'
import type { SendSignUpEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/SendSignUpEmailEndpoint'
import type { VerifyEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/VerifyEmailEndpoint'

export const sendSignInEmailRx = rxRuntime.fn(
  Effect.fn(function* (payload: SendSignInEmailRequestBody) {
    const { client } = yield* BackendClient

    return yield* client.Auth.sendSignInEmail({
      payload
    })
  })
)

export const sendSignUpEmailRx = rxRuntime.fn(
  Effect.fn(function* (payload: SendSignUpEmailRequestBody) {
    const { client } = yield* BackendClient

    return yield* client.Auth.sendSignUpEmail({
      payload
    })
  })
)

export const verifyEmailRx = rxRuntime.fn(
  Effect.fn(function* (payload: VerifyEmailRequestBody) {
    const { client } = yield* BackendClient

    return yield* client.Auth.verifyEmail({
      payload
    })
  })
)

export const useSendSignInEmail = () =>
  useRxSet(sendSignInEmailRx, { mode: 'promise' })
export const useSendSignUpEmail = () =>
  useRxSet(sendSignUpEmailRx, { mode: 'promise' })
export const useVerifyEmail = () => useRxSet(verifyEmailRx, { mode: 'promise' })
