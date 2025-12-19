import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { SendSignUpEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/SendSignUpEmailEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '@/features/mailer/service'
import SignInVerificationMail from '@/emails/SignInVerificationMail'
import {
  EmailAlreadyInUseError,
  TokenNotExpiredError,
  UnexpectedError
} from '@nodejs-fullstack-template/api/common/index'
import { ulid } from 'ulidx'

export const SendSignUpEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'sendSignUpEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository
      const mailer = yield* Mailer

      yield* userRepository.findByEmail(payload.email).pipe(
        Effect.flatMap(
          Option.match({
            onSome: () => Effect.fail(new EmailAlreadyInUseError()),
            onNone: () => Effect.void
          })
        )
      )

      const user = yield* userRepository.create({
        ...payload,
        id: ulid(),
        created_at: Math.round(Date.now() / 1000)
      })

      const tokenExpiry = Math.round(Date.now() / 1000) + 300 // add 5 mins

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345',
        purpose: 'VERIFICATION',
        expires_at: tokenExpiry,
        created_at: Math.round(Date.now() / 1000)
      })

      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Your verification code',
        email: SignInVerificationMail({
          token: verificationToken
        })
      })

      return SendSignUpEmailSuccessResponse.make()
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
          )
      })
    )
)
