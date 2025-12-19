import AuthenticationMiddleware from '@nodejs-fullstack-template/api/Auth/AuthenticationMiddleware'
import { Effect, Layer, Option, Redacted } from 'effect'
import { AuthSessionRepository, AuthUserRepository } from '../repository' // Import AuthSessionRepository
import { AuthSessionService } from '../service' // Updated import path
import { InvalidSessionError, AuthSessionServiceError } from '../service' // Updated import path
import UnauthorizedError from '@nodejs-fullstack-template/api/common/UnauthorizedError'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'
// import { User } from '@nodejs-fullstack-template/api/common/User'

export const AuthenticationMiddlewareLive = Layer.effect(
  AuthenticationMiddleware,
  Effect.gen(function* () {
    const authSessionService = yield* AuthSessionService
    const sessionRepository = yield* AuthSessionRepository // Inject AuthSessionRepository
    const userRepository = yield* AuthUserRepository

    return AuthenticationMiddleware.of({
      token: (token) =>
        Effect.gen(function* () {
          const _token = Redacted.value(token)

          // 1. Find the session using the repository
          const sessionOption = yield* sessionRepository.findById(_token)
          const session = yield* Option.match(sessionOption, {
            onNone: () => Effect.fail(new UnauthorizedError()),
            onSome: Effect.succeed
          })

          // 2. Validate the retrieved session
          yield* authSessionService.validate(session)

          // 3. Extend the session expiry
          yield* authSessionService.extendExpiry(session.id)

          // 4. Find the user associated with the session
          const userOption = yield* userRepository.findById(session.user_id)
          const user = yield* Option.match(userOption, {
            onNone: () => Effect.fail(new UnauthorizedError()),
            onSome: Effect.succeed
          })

          return user
        }).pipe(
          Effect.catchTags({
            // Translate InvalidSessionError to UnauthorizedError
            InvalidSessionError: () => Effect.fail(new UnauthorizedError()),
            AuthSessionServiceError: () => Effect.fail(new UnexpectedError()),
            // AuthSessionRepositoryError might be thrown by findById
            AuthSessionRepositoryError: () => Effect.fail(new UnexpectedError()),
            AuthUserRepositoryError: () => Effect.fail(new UnexpectedError())
          }),
          Effect.catchAllDefect(() => Effect.fail(new UnauthorizedError()))
        )
    })
  })
)
