import { type Context, Effect, Layer, Option } from 'effect'
import { AuthUserRepository } from './interface'
import { AuthUserRepositoryError } from './error'
import type { AuthUser } from '@/types'

// In-memory storage for auth users
const inMemoryUsers = new Map<string, AuthUser.Selectable>()

export const InMemoryAuthUserRepository: Context.Tag.Service<AuthUserRepository> =
  {
    create: (payload) =>
      Effect.sync(() => {
        const user = {
          ...payload,
          id: payload.id,
          verified_at: payload.verified_at ?? null,
          created_at: payload.created_at,
          updated_at: null
        }

        inMemoryUsers.set(user.id, user)

        return user
      }),

    findByEmail: (email) =>
      Effect.sync(() => {
        const user = Array.from(inMemoryUsers.values()).find(
          (u) => u.email === email
        )
        return user ? Option.some(user) : Option.none()
      }),

    findById: (id) =>
      Effect.sync(() => {
        const user = inMemoryUsers.get(id)
        return user ? Option.some(user) : Option.none()
      }),

    updateById: (id, payload) =>
      Effect.gen(function* (_) {
        const user = inMemoryUsers.get(id)

        if (!user) {
          return yield* Effect.fail(
            new AuthUserRepositoryError({
              message: `User with ID ${id} not found`
            })
          )
        }

        const updatedUser = {
          ...user,
          ...payload,
          updated_at: Math.round(Date.now() / 1000)
        }

        inMemoryUsers.set(id, updatedUser)

        return updatedUser
      }),

    deleteById: (id) =>
      Effect.sync(() => {
        const existed = inMemoryUsers.has(id)
        if (existed) {
          inMemoryUsers.delete(id)
        }
        return void 0
      })
  }

export const InMemoryAuthUserRepositoryLive = Layer.succeed(
  AuthUserRepository,
  InMemoryAuthUserRepository
)
