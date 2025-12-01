import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { VerifySignInEmailSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/VerifySignInEmailEndpoint'
import {
  InvalidOrExpiredTokenError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'
import {
  AuthSessionRepository,
  AuthTokenRepository,
  AuthUserRepository
} from '../repository'

export const VerifySignInEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'verifySignInEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const sessionRepository = yield* AuthSessionRepository
      const tokenRepository = yield* AuthTokenRepository
      const userRepository = yield* AuthUserRepository

      // Find the user associated with this email
      const userOption = yield* userRepository.findByEmail(payload.email)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({ message: 'User not found' })
        )
      }

      const user = userOption.value

      // Find the verification token associated with this user ID and purpose
      const tokenOption = yield* tokenRepository.findByUserIdAndPurpose({
        user_id: user.id,
        purpose: 'SIGNIN_VERIFICATION'
      })

      if (Option.isNone(tokenOption)) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Verification token not found'
          })
        )
      }

      const token = tokenOption.value

      if (Date.now() / 1000 > token.expires_at) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Verification token has expired'
          })
        )
      }

      // Verify the OTP matches
      if (token.token !== payload.otp) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Invalid verification code'
          })
        )
      }

      // Delete the verification token as it's been used
      yield* tokenRepository.deleteById(token.id)

      const session = yield* sessionRepository.create({
        id: ulid(),
        expires_at: Math.round(Date.now() / 1000 + 86400), // session expires in 1 day
        user_id: user.id,
        created_at: Math.round(Date.now() / 1000),
      })

      return VerifySignInEmailSuccessResponse.make({
        data: {
          access_token: session.id
        }
      })
    }).pipe(
      Effect.catchTags({
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to verify sign in: ${error.message}`
            })
          ),
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to access verification token: ${error.message}`
            })
          ),
        AuthTokenRepositoryNotFoundError: () =>
          Effect.fail(new InvalidOrExpiredTokenError()),
        AuthSessionRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create session: ${error.message}`
            })
          )
      })
    )
)
