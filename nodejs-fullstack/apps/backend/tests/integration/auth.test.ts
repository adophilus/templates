import { it, assert, describe } from '@effect/vitest'
import { Effect } from 'effect'
import { ApiClient, createMockUserSignUpDetails } from '../utils'
import { FetchHttpClient } from '@effect/platform'

describe('Auth API', () => {
  const userDetails = createMockUserSignUpDetails()
  let otp: string
  let accessToken: string

  it.effect('should send the sign up email', () =>
    Effect.gen(function* () {
      const client = yield* ApiClient

      const res = yield* client.Auth.sendSignUpEmail({
        payload: userDetails
      })

      otp = '12345'
      assert.strictEqual(res._tag, 'SignUpResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign up email', () =>
    Effect.gen(function* () {
      const client = yield* ApiClient

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
    Effect.gen(function* () {
      const client = yield* ApiClient

      const res = yield* client.Auth.sendSignInEmail({
        payload: { email: userDetails.email }
      })

      assert.strictEqual(res._tag, 'SendSignInEmailResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign in email', () =>
    Effect.gen(function* () {
      const client = yield* ApiClient

      const res = yield* client.Auth.verifySignInEmail({
        payload: {
          email: userDetails.email,
          otp
        }
      })

      assert.strictEqual(res._tag, 'VerifySignInEmailResponse')

      accessToken = res.data.access_token
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should get user profile', () =>
    Effect.gen(function* () {
      const client = yield* ApiClient

      const res = yield* client.Auth.getProfile()

      assert.strictEqual(res._tag, 'GetProfileResponse')
      assert.property(res.data, 'id')
      assert.property(res.data, 'full_name')
      assert.property(res.data, 'email')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )
})
