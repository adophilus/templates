import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { VerifySignUpEmailSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/VerifySignUpEmailEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import {
  InvalidOrExpiredTokenError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'
import { AuthSessionRepository } from '../repository/session'

export const VerifySignUpEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'verifySignUpEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository

      const user = yield* userRepository.findByEmail(payload.email).pipe(
        Effect.flatMap(
          Option.match({
            onNone: () =>
              Effect.fail(
                new InvalidOrExpiredTokenError()
              ),
            onSome: Effect.succeed
          })
        )
      )

      // Find the verification token associated with this user ID and purpose
      const tokenOption = yield* tokenRepository.findByUserIdAndPurpose({
        user_id: user.id,
        purpose: 'SIGNUP_VERIFICATION'
      })

      if (Option.isNone(tokenOption)) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Verification token not found'
          })
        )
      }

      const token = tokenOption.value

      // Check if token is expired
      if (Math.round(Date.now() / 1000) > token.expires_at) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Verification token has expired'
          })
        )
      }

      // Verify that the OTP matches the token
      if (token.token !== payload.otp) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Invalid verification code'
          })
        )
      }

      // Update the user to mark as verified
      yield* userRepository.updateById(user.id, {
        verified_at: Math.round(Date.now() / 1000)
      })

      // Delete the verification token as it's been used
      yield* tokenRepository
        .deleteById(token.id)
        .pipe(
          Effect.catchTag('AuthTokenRepositoryNotFoundError', () => Effect.void)
        )

      const sessionRepository = yield* AuthSessionRepository

      const session = yield* sessionRepository.create({
        id: ulid(),
        expires_at: Math.round(Date.now() / 1000 + 86400), // session expires in 1 day
        user_id: user.id
      })

      return VerifySignUpEmailSuccessResponse.make({
        data: {
          access_token: session.id
        }
      })
    }).pipe(
      Effect.catchTags({
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to verify sign up: ${error.message}`
            })
          ),
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to access verification token: ${error.message}`
            })
          ),
        AuthSessionRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create session: ${error.message}`
            })
          )
      })
    )
)
