import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import {
  GetProfileSuccessResponse
} from '@nodejs-fullstack-template/docs-openapi/Auth/GetProfileEndpoint'
import {
  AuthUserRepository
} from '../repository/user/interface'
import {
  UnauthorizedError,
  UnexpectedError
} from '@nodejs-fullstack-template/docs-openapi/common/index'

// Define a context tag for the authentication context service
class AuthContext extends Effect.Tag('AuthContext')<
  AuthContext,
  {
    readonly getAuthenticatedUser: () => Effect.Effect<string, UnauthorizedError>
  }
>() {}

export const GetProfileEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'getProfile',
  () =>
    Effect.gen(function* (_) {
      const userRepository = yield* AuthUserRepository
      const authContext = yield* AuthContext

      // Get the authenticated user ID from the auth context
      const userId = yield* authContext.getAuthenticatedUser()

      // Find the user by ID
      const userOption = yield* userRepository.findById(userId)

      if (Option.isNone(userOption)) {
        return yield* Effect.fail(
          new UnauthorizedError({
            message: 'User not found'
          })
        )
      }

      const user = userOption.value

      return GetProfileSuccessResponse.make({
        data: user
      })
    }).pipe(
      Effect.catchTags({
        AuthUserRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Failed to retrieve user profile: ${error.message}`
            })
          ),
        AuthTokenRepositoryError: (error) =>
          Effect.fail(
            new UnexpectedError({
              message: `Token verification failed: ${error.message}`
            })
          ),
        AuthContextError: (error) =>
          Effect.fail(
            new UnauthorizedError({
              message: `Authentication failed: ${error.message}`
            })
          )
      })
    )
)