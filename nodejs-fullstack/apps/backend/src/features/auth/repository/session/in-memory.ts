import { ulid } from 'ulidx'
import { Context, Effect, Layer, Option } from 'effect'
import { AuthSessionRepository } from './interface'
import { AuthSessionRepositoryError, AuthSessionRepositoryNotFoundError } from './error'
import type { AuthSession } from '@/types'

// In-memory storage for auth sessions
const inMemorySessions = new Map<string, AuthSession.Selectable>()

export const InMemoryAuthSessionRepository: Context.Tag.Service<AuthSessionRepository> = {
  create: (payload) =>
    Effect.sync(() => {
      const session = {
        ...payload,
        id: payload.id,
        created_at: payload.created_at,
        updated_at: null  // Initially null, will be updated during updates
      }
      
      inMemorySessions.set(session.id, session)
      
      return session
    }),
  
  findByUserId: (userId) =>
    Effect.sync(() => {
      const session = Array.from(inMemorySessions.values())
        .find(session => session.user_id === userId)
      
      return session ? Option.some(session) : Option.none()
    }),
  
  findById: (id) =>
    Effect.sync(() => {
      const session = inMemorySessions.get(id)
      return session ? Option.some(session) : Option.none()
    }),
  
  updateById: (id, payload) =>
    Effect.gen(function* (_) {
      const session = inMemorySessions.get(id)
      
      if (!session) {
        return yield* Effect.fail(
          new AuthSessionRepositoryNotFoundError({
            message: `Session with ID ${id} not found`
          })
        )
      }
      
      const updatedSession = {
        ...session,
        ...payload,
        updated_at: Math.round(Date.now() / 1000)
      }
      
      inMemorySessions.set(id, updatedSession)
      
      return updatedSession
    }),
  
  deleteById: (id) =>
    Effect.sync(() => {
      const existed = inMemorySessions.has(id)
      if (existed) {
        inMemorySessions.delete(id)
      }
      return void 0
    })
}

export const InMemoryAuthSessionRepositoryLive = Layer.succeed(AuthSessionRepository, InMemoryAuthSessionRepository)