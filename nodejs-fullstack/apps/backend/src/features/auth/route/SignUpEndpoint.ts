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
    Effect.gen(function*() {
      const userRepository = yield* AuthUserRepository

      yield* userRepository.findByEmail(payload.email).pipe(
        Effect.flatMap(
          Option.match({
            onSome: () => Effect.fail(new EmailAlreadyInUseError()),
            onNone: () => Effect.void
          })
        )
      )

      yield* userRepository.create({
        ...payload,
        id: ulid()
      })

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
        AuthUserRepositoryConstraintError: (error) =>
          new BadRequestError({
            message: `Failed to create user: ${error}`
          })
      })
    )
)
