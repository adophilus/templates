import { AppLive } from '@/app'
import { createMockUserSignUpDetails } from './generator'
import { NodeRuntime } from '@effect/platform-node'
import { Effect, Layer } from 'effect'
import {
  AuthSessionRepository,
  AuthUserRepository
} from '@/features/auth/repository'
import { ulid } from 'ulidx'
import type { AuthSession, AuthUser } from '@/types'

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

  yield* authSessionRepo.create({
    id: ulid(),
    expires_at: sessionExpiry,
    user_id: user.id,
    created_at: Math.round(Date.now() / 1000)
  })
})

export const createMockUserWithSession = (): {
  user: AuthUser.Selectable
  session: AuthSession.Selectable
} => {
  const layer = AppLive.pipe(
    Layer.provide(Layer.effectDiscard(createMockUserEffect))
  )

  NodeRuntime.runMain(Layer.launch(layer))
}
