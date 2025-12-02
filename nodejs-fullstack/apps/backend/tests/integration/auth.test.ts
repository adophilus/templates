import { it, assert, describe, beforeAll } from '@effect/vitest'
import { Effect } from 'effect'
import {
  type ApiClient,
  createMockUserSignUpDetails,
  makeApiClient
} from '../utils'
import { FetchHttpClient } from '@effect/platform'

describe('Auth API', () => {
  const userDetails = createMockUserSignUpDetails()
  let otp: string
  let accessToken: string
  let Client: ApiClient

  beforeAll(() => {
    Client = makeApiClient()
  })

  it.effect('should send the sign up email', () =>
    Effect.gen(function*() {
      const client = yield* Client

      const res = yield* client.Auth.sendSignUpEmail({
        payload: userDetails
      })

      otp = '12345'
      assert.strictEqual(res._tag, 'SignUpResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign up email', () =>
    Effect.gen(function*() {
      const client = yield* Client

      const res = yield* client.Auth.verifySignUpEmail({
        payload: {
          email: userDetails.email,
          otp
        }
      })

      assert.strictEqual(res._tag, 'VerifySignUpEmailResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should send the sign in email', () =>
    Effect.gen(function*() {
      const client = yield* Client

      const res = yield* client.Auth.sendSignInEmail({
        payload: { email: userDetails.email }
      })

      assert.strictEqual(res._tag, 'SendSignInEmailResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign in email', () =>
    Effect.gen(function*() {
      const client = yield* Client

      const res = yield* client.Auth.verifySignInEmail({
        payload: {
          email: userDetails.email,
          otp
        }
      })

      assert.strictEqual(res._tag, 'VerifySignInEmailResponse')

      accessToken = res.data.access_token
      Client = makeApiClient(accessToken)
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should get user profile', () =>
    Effect.gen(function*() {
      const client = yield* Client

      const res = yield* client.Auth.getProfile()

      assert.strictEqual(res._tag, 'GetProfileResponse')
      assert.property(res.data, 'id')
      assert.property(res.data, 'full_name')
      assert.property(res.data, 'email')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )
})
