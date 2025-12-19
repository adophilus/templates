import { Effect, Schedule, Console, Layer } from 'effect'
import { AuthTokenRepository } from './repository/token/interface'
import { AuthSessionService } from './service' // Import AuthSessionService

export const cleanExpiredAuthTokens = Effect.gen(function* () {
  const authTokenRepository = yield* AuthTokenRepository
  yield* Console.log('Running cron job: Cleaning expired auth tokens...')

  yield* authTokenRepository.deleteExpired().pipe(
    Effect.tap(() => Console.log('Expired auth tokens cleaned successfully.')),
    Effect.catchAll((error) =>
      Console.error(`Error cleaning expired auth tokens: ${error.message}`)
    )
  )
}).pipe(Effect.repeat(Schedule.fixed('1 minutes')))

export const cleanExpiredAuthSessions = Effect.gen(function* () {
  const authSessionService = yield* AuthSessionService
  yield* Console.log('Running cron job: Cleaning expired auth sessions...')

  yield* authSessionService.deleteAllExpired().pipe(
    Effect.tap(() =>
      Console.log('Expired auth sessions cleaned successfully.')
    ),
    Effect.catchAll((error) =>
      Console.error(`Error cleaning expired auth sessions: ${error.message}`)
    )
  )
}).pipe(Effect.repeat(Schedule.fixed('1 minutes')))

export const AuthCronJob = Layer.effectDiscard(
  Effect.all([cleanExpiredAuthTokens, cleanExpiredAuthSessions])
)
