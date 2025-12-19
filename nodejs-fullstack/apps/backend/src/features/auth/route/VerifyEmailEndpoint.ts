import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { VerifyEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/VerifyEmailEndpoint'
import {
  InvalidOrExpiredTokenError,
  UnexpectedError
} from '@nodejs-fullstack-template/api/common/index'
import { ulid } from 'ulidx'
import {
  AuthSessionRepository,
  AuthTokenRepository,
  AuthUserRepository
} from '../repository'

export const VerifyEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'verifyEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const sessionRepository = yield* AuthSessionRepository
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

      const session = yield* sessionRepository.create({
        id: ulid(),
        expires_at: Math.round(Date.now() / 1000 + 86400 * 30), // session expires in 30 days
        user_id: user.id,
        created_at: Math.round(Date.now() / 1000)
      })

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
        AuthSessionRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create session: ${error.message}`
            })
          )
      })
    )
)
