import { createMockUserSignUpDetails } from './generator'
import { Effect, Layer } from 'effect'
import {
  AuthSessionRepository,
  AuthUserRepository,
  KyselyAuthSessionRepositoryLive,
  KyselyAuthUserRepositoryLive
} from '@/features/auth/repository'
import { ulid } from 'ulidx'
import { SqliteKyselyClientLive } from '@/features/database/kysely/db/sqlite'

const createMockUserEffect = Effect.gen(function* () {
  const authUserRepo = yield* AuthUserRepository
  const authSessionRepo = yield* AuthSessionRepository
  const userDetails = createMockUserSignUpDetails()

  const user = yield* authUserRepo.create({
    id: ulid(),
    email: userDetails.email,
    full_name: userDetails.full_name,
    created_at: Math.round(Date.now() / 1000),
    verified_at: Math.round(Date.now() / 1000)
  })

  const sessionExpiry = Math.round(Date.now() / 1000 + 86400)

  const session = yield* authSessionRepo.create({
    id: ulid(),
    expires_at: sessionExpiry,
    user_id: user.id,
    created_at: Math.round(Date.now() / 1000)
  })

  return { user, session }
})

export const createMockUserWithSession = async () => {
  const layer = KyselyAuthSessionRepositoryLive.pipe(
    Layer.provideMerge(KyselyAuthUserRepositoryLive),
    Layer.provide(SqliteKyselyClientLive)
  )

  const program = createMockUserEffect.pipe(Effect.provide(layer))

  return Effect.runPromise(program)
}
