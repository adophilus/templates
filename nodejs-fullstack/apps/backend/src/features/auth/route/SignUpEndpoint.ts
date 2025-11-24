import { Effect, Layer } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/SignUpEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
import { AuthUserRepositoryValidationError } from '../repository/user/error'
import { EmailAlreadyInUseError, BadRequestError, UnexpectedError } from '@nodejs-fullstack-template/docs-openapi/common'
import { ulid } from 'ulidx'

export const SignUpEndpointLive = Layer.effect(
  HttpApiBuilder,
  Effect.gen(function*(_) {
    const userRepository = yield* AuthUserRepository

    return HttpApiBuilder.handle(
      Api,
      'Auth',
      'signUp',
      ({ payload }) =>
        Effect.gen(function*(_) {
          // Check if user already exists with this email
          const existingUserOption = yield* userRepository.findByEmail(payload.email).pipe(
            Effect.mapError((error) => {
              // Map repository errors to appropriate API errors
              if (error instanceof AuthUserRepositoryValidationError) {
                return new BadRequestError({
                  message: `Invalid email format: ${error.message}`
                })
              }
              return new UnexpectedError({
                message: `Failed to check existing user: ${String(error)}`
              })
            })
          )

          // If a user already exists with this email, return error
          if (existingUserOption._tag === 'Some') {
            return yield* Effect.fail(new EmailAlreadyInUseError())
          }

          // Create the user in the database using the repository
          const user = yield* userRepository.create({
            id: ulid(), // Use appropriate ID generation
            full_name: payload.full_name,
            email: payload.email,
            password_hash: '', // This would be handled in actual implementation with proper hashing
            phone_number: null,
            referral_code: null, // Generate referral code if needed
            verified_at: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }).pipe(
            Effect.mapError((error) => {
              // Map repository errors to appropriate API errors
              if (error instanceof AuthUserRepositoryValidationError) {
                return new BadRequestError({
                  message: `Validation error during user creation: ${error.message}`
                })
              }
              return new UnexpectedError({
                message: `Failed to create user: ${String(error)}`
              })
            })
          )

          // Return the success response using the schema from docs-openapi
          return SignUpSuccessResponse({})
        })
    )
  })
)
