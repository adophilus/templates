import { DateTime, Effect, Option } from 'effect'
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

export const VerifySignUpEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'verifySignUpEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository

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
      if (
        DateTime.unsafeMake(new Date()).epochMillis / 1000 >
        token.expires_at
      ) {
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
        verified_at: new Date().toISOString()
      })

      // Delete the verification token as it's been used
      yield* tokenRepository.deleteById(token.id)

      // In a real implementation, you would generate JWT tokens here
      // For now, returning mock tokens
      return VerifySignUpEmailSuccessResponse.make({
        data: {
          access_token: `mock_access_token_${ulid()}`,
          refresh_token: `mock_refresh_token_${ulid()}`
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
          )
      })
    )
)
