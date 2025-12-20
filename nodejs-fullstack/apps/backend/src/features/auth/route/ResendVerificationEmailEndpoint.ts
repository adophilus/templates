import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { ResendVerificationEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/ResendVerificationEmailEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '@/features/mailer/service'
import { SignInVerificationMail } from '@/emails'
import {
  UserNotFoundError,
  VerificationEmailAlreadySentError,
  UnexpectedError,
  TokenNotExpiredError
} from '@nodejs-fullstack-template/api/common/index'
import { ulid } from 'ulidx'

export const ResendVerificationEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'resendVerificationEmail',
  ({ payload }) =>
    Effect.gen(function* (_) {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository
      const mailer = yield* Mailer

      const userOption = yield* userRepository.findByEmail(payload.email)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(new UserNotFoundError())
      }

      const user = userOption.value

      const existingTokenOption = yield* tokenRepository.findByUserIdAndPurpose(
        {
          user_id: user.id,
          purpose: 'VERIFICATION'
        }
      )

      if (Option.isSome(existingTokenOption)) {
        const existingToken = existingTokenOption.value

        const currentTime = Math.round(Date.now() / 1000)
        if (currentTime < existingToken.expires_at) {
          return yield* Effect.fail(
            new VerificationEmailAlreadySentError({
              expires_at: existingToken.expires_at
            })
          )
        }

        yield* tokenRepository.deleteById(existingToken.id)
      }

      const tokenExpiry = Math.round(Date.now() / 1000) + 300 // 5 minutes

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345', // In reality, this would be a proper OTP
        purpose: 'VERIFICATION',
        expires_at: tokenExpiry,
        created_at: Math.round(Date.now() / 1000)
      })

      const email = yield* SignInVerificationMail({
        token: verificationToken
      })

      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Your verification code',
        email
      })

      return ResendVerificationEmailSuccessResponse.make()
    }).pipe(
      Effect.mapError((error) => {
        if (
          error._tag === 'MailerRenderingError' ||
          error._tag === 'MailerTransportError' ||
          error._tag === 'MailerValidationError'
        ) {
          return new UnexpectedError({
            message: error.message
          })
        }

        return error
      }),
      Effect.catchTags({
        AuthTokenRepositoryConstraintError: () =>
          Effect.fail(new TokenNotExpiredError()),
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: error.message
            })
          ),
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create verification token: ${error.message}`
            })
          ),
        AuthTokenRepositoryNotFoundError: () =>
          Effect.succeed(new ResendVerificationEmailSuccessResponse())
      })
    )
)
