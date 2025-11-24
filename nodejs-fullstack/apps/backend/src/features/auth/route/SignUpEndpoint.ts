import { Effect, Option } from 'effect'
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

      const existingUser = yield* userRepository
        .findByEmail(payload.email)
        .pipe(
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

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        purpose: 'SIGNUP_VERIFICATION',
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
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
      Effect.catchTags({
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: error.message
            })
          ),
        AuthTokenRepositoryError: (error) =>
          new UnexpectedError({
            message: `Failed to create verification token: ${error.message}`
          }),
        
        AuthTokenRepositoryConstraintError: (error) =>
          new BadRequestError({
            message: `Invalid token data: ${error.message}`
          }),
        MailerError: (error) =>
          new UnexpectedError({
            message: `Failed to send verification email: ${error.message}`
          })
      })
    )
)
