import { ulid } from 'ulidx'
import { Effect, Layer, Option } from 'effect'
import type { AuthToken } from '@/types'
import { AuthTokenService } from './interface'
import { 
  AuthTokenServiceError,
  AuthTokenServiceNotFoundError,
  AuthTokenServiceValidationError 
} from './error'

export const MockAuthTokenService = AuthTokenService.of({
  create: (payload) =>
    Effect.gen(function*(_) {
      const id = payload.id || ulid()
      
      return {
        id,
        user_id: payload.user_id,
        token: payload.token || 'mock-token',
        purpose: payload.purpose,
        expires_at: payload.expires_at,
        created_at: payload.created_at || new Date().toISOString(),
        updated_at: payload.updated_at || new Date().toISOString()
      }
    }),
  
  findByUserIdAndPurpose: (payload) =>
    Effect.gen(function*(_) {
      // For mock, return a mock token if user exists and purpose matches
      if (payload.user_id && payload.purpose) {
        return Option.some({
          id: ulid(),
          user_id: payload.user_id,
          token: 'mock-token',
          purpose: payload.purpose,
          expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
      return Option.none()
    }),
  
  updateById: (id, payload) =>
    Effect.gen(function*(_) {
      return {
        id,
        user_id: 'mock-user-id', // This would be retrieved from existing record in real implementation
        token: payload.token || 'mock-token',
        purpose: payload.purpose || 'GENERAL',
        expires_at: payload.expires_at,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }),
  
  findById: (id) =>
    Effect.gen(function*(_) {
      if (id) {
        return Option.some({
          id,
          user_id: 'mock-user-id',
          token: 'mock-token',
          purpose: 'GENERAL',
          expires_at: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
      return Option.none()
    }),
  
  deleteById: (id) =>
    Effect.gen(function*(_) {
      if (!id) {
        return yield* Effect.fail(
          new AuthTokenServiceError({ message: `Invalid token ID: ${id}` })
        )
      }
      // For mock, just succeed
      return void 0
    })
})

export const MockAuthTokenServiceLive = Layer.succeed(AuthTokenService, MockAuthTokenService)