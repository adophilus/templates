import { Effect, Layer, Option } from 'effect'
import { AuthSessionService } from './interface'
import { AuthSessionRepository } from '../../repository/session/interface'
import { InvalidSessionError, AuthSessionServiceError } from './error'
import type { AuthSession } from '@/types'
import { ulid } from 'ulidx'

export const AuthSessionServiceLive = Layer.effect(
  AuthSessionService,
  Effect.gen(function* () {
    const sessionRepository = yield* AuthSessionRepository

    const SESSION_EXTEND_EXPIRY_DAYS = 15
    const SESSION_CREATE_EXPIRY_DAYS = 30

    // Helper to validate an already fetched session
    const validateAuthSession = (session: AuthSession.Selectable) =>
      Effect.gen(function* () {
        const currentTime = Math.round(Date.now() / 1000)
        if (session.expires_at < currentTime) {
          return yield* Effect.fail(
            new InvalidSessionError({ message: 'Session expired' })
          )
        }
        return session
      })

    return AuthSessionService.of({
      create: (userId) =>
        Effect.gen(function* () {
          const currentTime = Math.round(Date.now() / 1000)
          const newSessionId = ulid()
          const expires_at = currentTime + 86400 * SESSION_CREATE_EXPIRY_DAYS

          const payload: AuthSession.Insertable = {
            id: newSessionId,
            user_id: userId,
            expires_at: expires_at,
            created_at: currentTime
          }

          return yield* sessionRepository.create(payload).pipe(
            Effect.mapError(
              (error) =>
                new AuthSessionServiceError({
                  message: error.message,
                  cause: error
                })
            )
          )
        }),

      validate: (session) => validateAuthSession(session), // Expose helper as validate method

      extendExpiry: (sessionId) =>
        Effect.gen(function* () {
          // Retrieve the session first
          const sessionOption = yield* sessionRepository
            .findById(sessionId)
            .pipe(
              Effect.mapError(
                (error) =>
                  new AuthSessionServiceError({
                    message: error.message,
                    cause: error
                  })
              )
            )
          const session = yield* Option.match(sessionOption, {
            onNone: () =>
              Effect.fail(
                new InvalidSessionError({ message: 'Session not found' })
              ),
            onSome: Effect.succeed
          })

          // Now validate the retrieved session
          yield* validateAuthSession(session)

          const newExpiry = Math.round(
            Date.now() / 1000 + 86400 * SESSION_EXTEND_EXPIRY_DAYS
          )
          return yield* sessionRepository
            .updateById(session.id, { expires_at: newExpiry })
            .pipe(
              Effect.mapError(
                (error) =>
                  new AuthSessionServiceError({
                    message: error.message,
                    cause: error
                  })
              )
            )
        }),

      deleteAllExpired: () =>
        sessionRepository.deleteAllExpired().pipe(
          Effect.mapError(
            (error) =>
              new AuthSessionServiceError({
                message: error.message,
                cause: error
              })
          )
        )
    })
  })
)
