import { DateTime, Duration, Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/SignUpEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '@/features/mailer/service'
import SignUpVerificationMail from '@/emails/SignUpVerificationMail'
import {
  EmailAlreadyInUseError,
  BadRequestError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'

export const SignUpEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'signUp',
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
        id: ulid()
      })

      const tokenExpiry = DateTime.unsafeMake(new Date()).pipe(
        DateTime.add({ minutes: 5 })
      )

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345',
        purpose: 'SIGNUP_VERIFICATION',
        expires_at: Math.round(tokenExpiry.epochMillis / 1000)
      })

      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Verify your email address',
        email: SignUpVerificationMail({
          token: verificationToken
        })
      })

      return SignUpSuccessResponse.make()
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
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: error.message
            })
          ),
        AuthUserRepositoryConstraintError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create auth user: ${error.message}`
            })
          ),
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create verification token: ${error.message}`
            })
          ),
        AuthTokenRepositoryConstraintError: (error) =>
          Effect.fail(
            new BadRequestError({
              message: `Invalid token data: ${error.message}`
            })
          )
      })
    )
)
