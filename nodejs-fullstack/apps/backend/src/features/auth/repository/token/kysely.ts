import { Effect, Layer, Option } from 'effect'
import { KyselyClient } from '@/features/database/kysely'
import { AuthTokenRepository } from './interface'
import { AuthTokenRepositoryError } from './error'

export const KyselyAuthTokenRepositoryLive = Layer.effect(
  AuthTokenRepository,
  Effect.gen(function* (_) {
    const db = yield* KyselyClient

    return AuthTokenRepository.of({
      create: (payload) =>
        Effect.tryPromise({
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
        }),

      findByUserIdAndPurpose: (payload) =>
        Effect.tryPromise({
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
        }).pipe(Effect.map(Option.fromNullable)),

      updateById: (id, payload) =>
        Effect.tryPromise({
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
        }),

      findById: (id) =>
        Effect.tryPromise({
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
        }).pipe(Effect.map(Option.fromNullable)),

      deleteById: (id) =>
        Effect.tryPromise({
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
)
