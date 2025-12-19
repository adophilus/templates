import { Effect, Schedule, Console, Layer } from 'effect'
import { AuthTokenRepository } from './repository/token/interface'

// Define the cron job to clean expired auth tokens
export const cleanExpiredAuthTokens = Effect.gen(function* (_) {
  const authTokenRepository = yield* AuthTokenRepository
  yield* Console.log('Running cron job: Cleaning expired auth tokens...')

  yield* authTokenRepository.deleteExpired().pipe(
    Effect.tap(() => Console.log('Expired auth tokens cleaned successfully.')),
    Effect.catchAll((error) =>
      Console.error(`Error cleaning expired auth tokens: ${error.message}`)
    )
  )
}).pipe(
  // Schedule the cron job to run periodically (e.g., every 1 minutes)
  Effect.repeat(Schedule.fixed('1 minutes')),
  Effect.fork
)

export const AuthCronJob = Layer.effectDiscard(cleanExpiredAuthTokens)
