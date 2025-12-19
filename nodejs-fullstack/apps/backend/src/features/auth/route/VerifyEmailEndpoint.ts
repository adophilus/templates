import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { VerifyEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/VerifyEmailEndpoint'
import {
  InvalidOrExpiredTokenError,
  UnexpectedError
} from '@nodejs-fullstack-template/api/common/index'
// import { ulid } from 'ulidx' // No longer needed here
import { AuthTokenRepository, AuthUserRepository } from '../repository'
import { AuthSessionService } from '../service' // Updated import path

export const VerifyEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'verifyEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const authSessionService = yield* AuthSessionService // Inject AuthSessionService
      const tokenRepository = yield* AuthTokenRepository
      const userRepository = yield* AuthUserRepository

      const userOption = yield* userRepository.findByEmail(payload.email)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({ message: 'User not found' })
        )
      }

      const user = userOption.value

      const tokenOption = yield* tokenRepository.findByUserIdAndPurpose({
        user_id: user.id,
        purpose: 'VERIFICATION'
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

      if (token.token !== payload.otp) {
        return yield* Effect.fail(
          new InvalidOrExpiredTokenError({
            message: 'Invalid verification code'
          })
        )
      }

      yield* tokenRepository.deleteById(token.id)

      if (user.verified_at === null) {
        yield* userRepository.updateById(user.id, {
          verified_at: Math.round(Date.now() / 1000)
        })
      }

      // Use AuthSessionService to create the session
      const session = yield* authSessionService.create(user.id)

      return VerifyEmailSuccessResponse.make({
        data: {
          access_token: session.id
        }
      })
    }).pipe(
      Effect.catchTags({
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to verify: ${error.message}`
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
        // Catch AuthSessionServiceError and map it to UnexpectedError
        AuthSessionServiceError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create session: ${error.message}`
            })
          )
      })
    )
)
