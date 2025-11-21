import { Effect, Layer, Option } from 'effect'
import { KyselyClient } from '@/features/database/kysely'
import { AuthTokenRepository } from './interface'
import {
  AuthTokenRepositoryError,
  AuthTokenRepositoryNotFoundError
} from './error'
import type { AuthToken } from '@/types'

export const KyselyAuthTokenRepositoryLive = Layer.effect(
  AuthTokenRepository,
  Effect.gen(function* (_) {
    const db = yield* KyselyClient

    return AuthTokenRepository.of({
      create: (payload) =>
        Effect.gen(function* (_) {
          const token = yield* Effect.tryPromise({
            try: () =>
              db
                .insertInto('auth_tokens')
                .values(payload)
                .returningAll()
                .executeTakeFirstOrThrow(),
            catch: (error) =>
              new AuthTokenRepositoryError({
                message: `Failed to create auth token: ${String(error)}`,
                cause: error
              })
          })

          return token
        }),

      findByUserIdAndPurpose: (payload) =>
        Effect.gen(function* (_) {
          const token = yield* Effect.tryPromise({
            try: () =>
              db
                .selectFrom('auth_tokens')
                .selectAll()
                .where('user_id', '=', payload.user_id)
                .where('purpose', '=', payload.purpose)
                .executeTakeFirst(),
            catch: (error) =>
              new AuthTokenRepositoryError({
                message: `Failed to find token by user ID and purpose: ${String(error)}`,
                cause: error
              })
          })

          return token ? Option.some(token) : Option.none()
        }),

      updateById: (id, payload) =>
        Effect.gen(function* (_) {
          const token = yield* Effect.tryPromise({
            try: () =>
              db
                .updateTable('auth_tokens')
                .set({
                  ...payload,
                  updated_at: new Date().toISOString()
                })
                .where('id', '=', id)
                .returningAll()
                .executeTakeFirstOrThrow(),
            catch: (error) =>
              new AuthTokenRepositoryError({
                message: `Failed to update token by ID: ${String(error)}`,
                cause: error
              })
          })

          return token
        }),

      findById: (id) =>
        Effect.gen(function* (_) {
          const token = yield* Effect.tryPromise({
            try: () =>
              db
                .selectFrom('auth_tokens')
                .selectAll()
                .where('id', '=', id)
                .executeTakeFirst(),
            catch: (error) =>
              new AuthTokenRepositoryError({
                message: `Failed to find token by ID: ${String(error)}`,
                cause: error
              })
          })

          return token ? Option.some(token) : Option.none()
        }),

      deleteById: (id) =>
        Effect.gen(function* (_) {
          yield* Effect.tryPromise({
            try: () =>
              db
                .deleteFrom('auth_tokens')
                .where('id', '=', id)
                .executeTakeFirst(),
            catch: (error) =>
              new AuthTokenRepositoryError({
                message: `Failed to delete token by ID: ${String(error)}`,
                cause: error
              })
          })
        })
    })
  })
)
