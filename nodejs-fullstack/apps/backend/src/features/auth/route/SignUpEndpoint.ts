import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/SignUpEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthTokenRepository } from '../repository/token/interface'
import { Mailer } from '../service/mailer/interface'
import { SignUpVerificationMail } from '@/emails/SignUpVerificationMail'
import {
  EmailAlreadyInUseError,
  BadRequestError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'
import { config } from '@/features/config'

export const SignUpEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'signUp',
  ({ payload }) =>
    Effect.gen(function*() {
      const userRepository = yield* AuthUserRepository
      const tokenRepository = yield* AuthTokenRepository
      const mailer = yield* Mailer

      // Check if user already exists with this email
      const existingUser = yield* userRepository.findByEmail(payload.email).pipe(
        Effect.flatMap(
          Option.match({
            onSome: () => Effect.fail(new EmailAlreadyInUseError()),
            onNone: () => Effect.void
          })
        )
      )

      // Create the user in the database
      const user = yield* userRepository.create({
        ...payload,
        id: ulid()
      })

      // Generate a verification token for the newly created user
      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        purpose: 'SIGNUP_VERIFICATION', // Specific purpose for sign up verification
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

      // Send verification email to the user
      yield* mailer.send({
        recipients: [payload.email], // Send to the user's email
        subject: 'Verify your email address',
        email: SignUpVerificationMail({
          token: verificationToken // Pass the token object to the email component
        })
      }).pipe(
        Effect.mapError((error) =>
          new UnexpectedError({
            message: `Failed to send verification email: ${String(error)}`,
            cause: error
          })
        )
      )

      return SignUpSuccessResponse.make()
    }).pipe(
      Effect.catchTags({
        AuthUserRepositoryError: (error) => {
          console.log(error)
          return Effect.fail(
            new UnexpectedError({
              message: error.message
            })
          )
        },
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
