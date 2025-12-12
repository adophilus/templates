import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { SendVerificationEmailSuccessResponse } from '@nodejs-fullstack-template/api/Auth/SendVerificationEmailEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '@/features/mailer/service'
import SignInVerificationMail from '@/emails/SignInVerificationMail'
import {
  UserNotFoundError,
  UnexpectedError
} from '@nodejs-fullstack-template/api/common/index'
import { ulid } from 'ulidx'

export const SendVerificationEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'sendVerificationEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository
      const mailer = yield* Mailer

      // Find the user by email
      const userOption = yield* userRepository.findByEmail(payload.email)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(new UserNotFoundError())
      }

      const user = userOption.value

      // Generate a verification token
      const tokenExpiry = Math.round(Date.now() / 1000) + 300 // add 5 mins

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345', // In reality, this would be a proper OTP/generate one
        purpose: 'VERIFICATION',
        expires_at: tokenExpiry,
        created_at: Math.round(Date.now() / 1000)
      })

      // Send verification email to the user
      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Your verification code',
        email: SignInVerificationMail({
          token: verificationToken
        })
      })

      return SendVerificationEmailSuccessResponse.make()
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
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to create verification token: ${error.message}`
            })
          )
      })
    )
)
