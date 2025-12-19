import AuthenticationMiddleware from '@nodejs-fullstack-template/api/Auth/AuthenticationMiddleware'
import { Effect, Layer, Option, Redacted } from 'effect'
import { AuthSessionRepository, AuthUserRepository } from '../repository'
import UnauthorizedError from '@nodejs-fullstack-template/api/common/UnauthorizedError'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'
import { User } from '@nodejs-fullstack-template/api/common/User' // Import User type

export const AuthenticationMiddlewareLive = Layer.effect(
  AuthenticationMiddleware,
  Effect.gen(function* () {
    const sessionRepository = yield* AuthSessionRepository
    const userRepository = yield* AuthUserRepository

    return AuthenticationMiddleware.of({
      token: (token) =>
        Effect.gen(function* () {
          const _token = Redacted.value(token)

          // 1. Find the session
          const sessionOption = yield* sessionRepository.findById(_token)
          const session = yield* Option.match(sessionOption, {
            onNone: () => Effect.fail(new UnauthorizedError()),
            onSome: Effect.succeed
          })

          // 2. Check if the session is expired
          const currentTime = Math.round(Date.now() / 1000)
          if (session.expires_at < currentTime) {
            return yield* Effect.fail(new UnauthorizedError())
          }

          // 3. Find the user associated with the session
          const userOption = yield* userRepository.findById(session.user_id)
          const user = yield* Option.match(userOption, {
            onNone: () => Effect.fail(new UnauthorizedError()),
            onSome: Effect.succeed
          })

          // 4. Extend the session expiry by 15 days
          const newExpiry = Math.round(Date.now() / 1000 + 86400 * 15) // 15 days
          yield* sessionRepository.extendExpiryById(session.id, newExpiry)

          return user
        }).pipe(
          Effect.catchTags({
            AuthSessionRepositoryNotFoundError: () =>
              Effect.fail(new UnauthorizedError()),
            AuthSessionRepositoryError: () =>
              Effect.fail(new UnexpectedError()),
            AuthUserRepositoryError: () => Effect.fail(new UnexpectedError())
          }),
        )
    })
  })
)
