import { it, describe, beforeAll } from '@effect/vitest'
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
    Effect.gen(function* () {
      const client = yield* Client

      yield* client.Auth.sendSignUpEmail({
        payload: userDetails
      })

      otp = '12345'
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign up email', () =>
    Effect.gen(function* () {
      const client = yield* Client

      yield* client.Auth.verifyEmail({
        payload: {
          email: userDetails.email,
          otp
        }
      })
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should send the sign in email', () =>
    Effect.gen(function* () {
      const client = yield* Client

      yield* client.Auth.sendSignInEmail({
        payload: { email: userDetails.email }
      })
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should verify the sign in email', () =>
    Effect.gen(function* () {
      const client = yield* Client

      const res = yield* client.Auth.verifyEmail({
        payload: {
          email: userDetails.email,
          otp
        }
      })

      accessToken = res.data.access_token
      Client = makeApiClient(accessToken)
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should get user profile', () =>
    Effect.gen(function* () {
      const client = yield* Client

      yield* client.Auth.getProfile()
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )
})
