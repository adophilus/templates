import { makeAtomRuntime } from '@/services/atom'
import { Effect, Layer, } from 'effect'
import { Atom, useAtomSet } from '@effect-atom/atom-react'
import type { SendSignInEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/SendSignInEmailEndpoint'
import type { SendSignUpEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/SendSignUpEmailEndpoint'
import type { VerifyEmailRequestBody } from '@nodejs-fullstack-template/api/Auth/VerifyEmailEndpoint'
import { backendClientAtom } from '@/services/backend'

const atomRuntime = makeAtomRuntime(Layer.empty)

export const sendSignInEmailAtom = atomRuntime.fn(
  Effect.fn(function*(payload: SendSignInEmailRequestBody) {
    const { client } = yield* Atom.getResult(backendClientAtom)

    return yield* client.Auth.sendSignInEmail({
      payload
    })
  })
)

export const sendSignUpEmailAtom = atomRuntime.fn(
  Effect.fn(function*(payload: SendSignUpEmailRequestBody) {
    const { client } = yield* Atom.getResult(backendClientAtom)

    return yield* client.Auth.sendSignUpEmail({
      payload
    })
  })
)

export const verifyEmailAtom = atomRuntime.fn(
  Effect.fn(function*(payload: VerifyEmailRequestBody) {
    const { client } = yield* Atom.getResult(backendClientAtom)

    return yield* client.Auth.verifyEmail({
      payload
    })
  })
)

export const useSendSignInEmail = () =>
  useAtomSet(sendSignInEmailAtom, { mode: 'promiseExit' })
export const useSendSignUpEmail = () =>
  useAtomSet(sendSignUpEmailAtom, { mode: 'promiseExit' })
export const useVerifyEmail = () =>
  useAtomSet(verifyEmailAtom, { mode: 'promiseExit' })
