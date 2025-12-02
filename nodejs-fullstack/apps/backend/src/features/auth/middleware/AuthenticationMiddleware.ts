import AuthenticationMiddleware from '@nodejs-fullstack-template/api/Auth/AuthenticationMiddleware'
import { Effect, Layer, Option, Redacted } from 'effect'
import { AuthSessionRepository, AuthUserRepository } from '../repository'
import UnauthorizedError from '@nodejs-fullstack-template/api/common/UnauthorizedError'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'

export const AuthenticationMiddlewareLive = Layer.effect(
  AuthenticationMiddleware,
  Effect.gen(function* () {
    const sessionRepository = yield* AuthSessionRepository
    const userRepository = yield* AuthUserRepository

    return AuthenticationMiddleware.of({
      token: (token) =>
        Effect.gen(function* () {
          const _token = Redacted.value(token)

          const res = yield* sessionRepository.findById(_token).pipe(
            Effect.map(Option.getOrThrow),
            Effect.flatMap((session) =>
              userRepository.findById(session.user_id)
            ),
            Effect.map(Option.getOrThrow)
          )

          return res
        }).pipe(
          Effect.catchTags({
            AuthSessionRepositoryError: () =>
              Effect.fail(new UnexpectedError()),
            AuthUserRepositoryError: () => Effect.fail(new UnexpectedError())
          }),
          Effect.catchAllDefect(() => Effect.fail(new UnauthorizedError()))
        )
    })
  })
)
