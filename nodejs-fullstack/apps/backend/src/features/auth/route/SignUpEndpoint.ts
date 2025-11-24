import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Auth/SignUpEndpoint'
import { AuthUserRepository } from '../repository/user/interface'
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

      yield* userRepository.findByEmail(payload.email).pipe(
        Effect.catchTags({
          AuthUserRepositoryError: (error) =>
            Effect.fail(
              new UnexpectedError({
                message: `Failed to find user by email: ${error.message}`
              })
            )
        }),
        Effect.flatMap(
          Option.match({
            onNone: () => Effect.fail(new EmailAlreadyInUseError()),
            onSome: Effect.succeed
          })
        )
      )

      yield* userRepository
        .create({
          id: ulid(),
          full_name: payload.full_name,
          email: payload.email,
          verified_at: null
        })
        .pipe(
          Effect.catchTags({
            AuthUserRepositoryError: (error) =>
              new UnexpectedError({
                message: `Failed to create user: ${error}`
              }),
            AuthUserRepositoryConstraintError: (error) =>
              new BadRequestError({
                message: `Failed to create user: ${error}`
              })
          })
        )

      return SignUpSuccessResponse.make()
    })
)
