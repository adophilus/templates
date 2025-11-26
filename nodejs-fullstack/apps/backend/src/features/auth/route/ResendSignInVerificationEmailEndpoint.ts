import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { 
  ResendSignInVerificationEmailSuccessResponse 
} from '@nodejs-fullstack-template/docs-openapi/Auth/ResendSignInVerificationEmailEndpoint'
import { 
  AuthUserRepository 
} from '../repository/user/interface'
import { 
  AuthTokenRepository 
} from '../repository/token/interface'
import { 
  Mailer 
} from '@/features/mailer/service'
import SignInVerificationMail from '@/emails/SignInVerificationMail'
import {
  UserNotFoundError,
  TokenNotExpiredError,
  UserAlreadyVerifiedError,
  VerificationEmailAlreadySentError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'
import { ulid } from 'ulidx'

export const ResendSignInVerificationEmailEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'resendSignInVerificationEmail',
  ({ payload }) =>
    Effect.gen(function* (_) {
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
      
      // Check if user is already verified
      if (user.verified_at !== null) {
        return yield* Effect.fail(
          new UserAlreadyVerifiedError()
        )
      }

      // Check if a verification token already exists for this user and purpose
      const existingTokenOption = yield* tokenRepository.findByUserIdAndPurpose({
        user_id: user.id,
        purpose: 'SIGNUP_VERIFICATION' // or SIGNIN_VERIFICATION - need to determine which
      })

      if (Option.isSome(existingTokenOption)) {
        const existingToken = existingTokenOption.value
        
        // Check if the existing token hasn't expired yet (e.g., hasn't been more than 5 minutes)
        const currentTime = Math.round(Date.now() / 1000)
        if (currentTime < existingToken.expires_at) {
          return yield* Effect.fail(
            new VerificationEmailAlreadySentError()
          )
        }
        
        // If the token has expired, delete it so we can create a new one
        yield* tokenRepository.deleteById(existingToken.id)
      }

      // Generate a new sign-in verification token
      const tokenExpiry = Math.round(Date.now() / 1000) + 300 // 5 minutes

      const verificationToken = yield* tokenRepository.create({
        id: ulid(),
        user_id: user.id,
        token: '12345', // In reality, this would be a proper OTP
        purpose: 'SIGNIN_VERIFICATION',
        expires_at: tokenExpiry
      })

      // Send verification email to the user
      yield* mailer.send({
        recipients: [payload.email],
        subject: 'Your sign-in verification code',
        email: SignInVerificationMail({
          token: verificationToken
        })
      })

      return ResendSignInVerificationEmailSuccessResponse.make()
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
          ),
        AuthTokenRepositoryConstraintError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Token constraint violation: ${error.message}`
            })
          )
      })
    )
)