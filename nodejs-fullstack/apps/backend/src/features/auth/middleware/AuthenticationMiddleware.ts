import AuthenticationMiddleware from '@nodejs-fullstack-template/api/Auth/AuthenticationMiddleware'
import { Effect, Layer, Redacted, Option } from 'effect' // Keep Option import for userRepository.findById
import { AuthUserRepository } from '../repository'
import { AuthSessionService } from '../service'
import { InvalidSessionError, AuthSessionServiceError } from '../service'
import UnauthorizedError from '@nodejs-fullstack-template/api/common/UnauthorizedError'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'
// import { User } from '@nodejs-fullstack-template/api/common/User'

export const AuthenticationMiddlewareLive = Layer.effect(
  AuthenticationMiddleware,
  Effect.gen(function* () {
    const authSessionService = yield* AuthSessionService
    // const sessionRepository = yield* AuthSessionRepository // Removed sessionRepository injection
    const userRepository = yield* AuthUserRepository

    return AuthenticationMiddleware.of({
      token: (token) =>
        Effect.gen(function* () {
          const _token = Redacted.value(token)

          // 1. Find and validate the session using the service
          const session = yield* authSessionService.findById(_token)

          // 2. Extend the session expiry
          yield* authSessionService.extendExpiry(session.id)

          // 3. Find the user associated with the session
          const userOption = yield* userRepository.findById(session.user_id)
          const user = yield* Option.match(userOption, {
            onNone: () => Effect.fail(new UnauthorizedError()),
            onSome: Effect.succeed
          })

          return user
        }).pipe(
          Effect.catchTags({
            InvalidSessionError: () => Effect.fail(new UnauthorizedError()),
            AuthSessionServiceError: () => Effect.fail(new UnexpectedError()),
            AuthUserRepositoryError: () => Effect.fail(new UnexpectedError())
          }),
          Effect.catchAllDefect(() => Effect.fail(new UnauthorizedError()))
        )
    })
  })
)
