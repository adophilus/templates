import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SendSignInEmailSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/SendSignInEmailEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '@/features/mailer/service'
import SignInVerificationMail from '@/emails/SignInVerificationMail'
import {
  UserNotFoundError,
  UserNotVerifiedError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'

export const SendSignInEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'sendSignInEmail',
  ({ payload }) =>
    Effect.gen(function* () {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository
      const mailer = yield* Mailer

      // Find the user by email
      const userOption = yield* userRepository.findByEmail(payload.email)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(
          new UserNotFoundError()
        )
      }

      const user = userOption.value

      // Check if user is verified
      if (user.verified_at === null) {
        return yield* Effect.fail(
          new UserNotVerifiedError()
        )
      }

      // Generate a sign-in verification token
      const tokenExpiry = Math.round(Date.now() / 1000) + 300 // add 5 mins

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345', // In reality, this would be a proper OTP/generate one
        purpose: 'SIGNIN_VERIFICATION',
        expires_at: tokenExpiry,
        created_at: Math.round(Date.now() / 1000)
      })

      // Send verification email to the user
      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Your sign-in verification code',
        email: SignInVerificationMail({
          token: verificationToken
        })
      })

      return SendSignInEmailSuccessResponse.make()
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
