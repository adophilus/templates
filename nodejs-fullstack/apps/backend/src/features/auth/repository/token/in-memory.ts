import { ulid } from 'ulidx'
import { Context, Effect, Layer, Option } from 'effect'
import { AuthTokenRepository } from './interface'
import { AuthTokenRepositoryError, AuthTokenRepositoryNotFoundError } from './error'
import type { AuthToken } from '@/types'

// In-memory storage for auth tokens
const inMemoryTokens = new Map<string, AuthToken.Selectable>()

export const InMemoryAuthTokenRepository: Context.Tag.Service<AuthTokenRepository> = {
  create: (payload) =>
    Effect.sync(() => {
      const token = {
        ...payload,
        id: payload.id,
        created_at: payload.created_at,
        updated_at: null  // Initially null, will be updated during updates
      }
      
      inMemoryTokens.set(token.id, token)
      
      return token
    }),
  
  findByUserIdAndPurpose: (payload) =>
    Effect.sync(() => {
      const token = Array.from(inMemoryTokens.values())
        .find(token => token.user_id === payload.user_id && token.purpose === payload.purpose)
      
      return token ? Option.some(token) : Option.none()
    }),
  
  findById: (id) =>
    Effect.sync(() => {
      const token = inMemoryTokens.get(id)
      return token ? Option.some(token) : Option.none()
    }),
  
  updateById: (id, payload) =>
    Effect.gen(function* (_) {
      const token = inMemoryTokens.get(id)
      
      if (!token) {
        return yield* Effect.fail(
          new AuthTokenRepositoryNotFoundError({
            message: `Token with ID ${id} not found`
          })
        )
      }
      
      const updatedToken = {
        ...token,
        ...payload,
        updated_at: Math.round(Date.now() / 1000)
      }
      
      inMemoryTokens.set(id, updatedToken)
      
      return updatedToken
    }),
  
  deleteById: (id) =>
    Effect.sync(() => {
      const existed = inMemoryTokens.has(id)
      if (existed) {
        inMemoryTokens.delete(id)
      }
      return void 0
    })
}

export const InMemoryAuthTokenRepositoryLive = Layer.succeed(AuthTokenRepository, InMemoryAuthTokenRepository)