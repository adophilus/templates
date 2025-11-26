import { Effect, Layer, Option } from 'effect'
import { KyselyClient } from '@/features/database/kysely'
import { AuthUserRepository } from './interface'
import { AuthUserRepositoryError } from './error'

export const KyselyAuthUserRepositoryLive = Layer.effect(
  AuthUserRepository,
  Effect.gen(function* (_) {
    const db = yield* KyselyClient

    return AuthUserRepository.of({
      create: (payload) =>
        Effect.tryPromise({
          try: () =>
            db
              .insertInto('auth_users')
              .values(payload)
              .returningAll()
              .executeTakeFirstOrThrow(),
          catch: (error) =>
            new AuthUserRepositoryError({
              message: `Failed to create auth user: ${String(error)}`,
              cause: error
            })
        }),

      findByEmail: (email) =>
        Effect.tryPromise({
          try: () =>
            db
              .selectFrom('auth_users')
              .selectAll()
              .where('email', '=', email)
              .executeTakeFirst(),
          catch: (error) =>
            new AuthUserRepositoryError({
              message: `Failed to find user by email: ${String(error)}`,
              cause: error
            })
        }).pipe(Effect.map(Option.fromNullable)),

      findById: (id) =>
        Effect.tryPromise({
          try: () =>
            db
              .selectFrom('auth_users')
              .selectAll()
              .where('id', '=', id)
              .executeTakeFirst(),
          catch: (error) =>
            new AuthUserRepositoryError({
              message: `Failed to find user by ID: ${String(error)}`,
              cause: error
            })
        }).pipe(Effect.map(Option.fromNullable)),

      updateById: (id, payload) =>
        Effect.tryPromise({
          try: () =>
            db
              .updateTable('auth_users')
              .set({
                ...payload,
                updated_at: Math.round(Date.now() / 1000)
              })
              .where('id', '=', id)
              .returningAll()
              .executeTakeFirstOrThrow(),
          catch: (error) =>
            new AuthUserRepositoryError({
              message: `Failed to update user by ID: ${String(error)}`,
              cause: error
            })
        }),

      deleteById: (id) =>
        Effect.tryPromise({
          try: () =>
            db.deleteFrom('auth_users').where('id', '=', id).executeTakeFirst(),
          catch: (error) =>
            new AuthUserRepositoryError({
              message: `Failed to delete user by ID: ${String(error)}`,
              cause: error
            })
        })
    })
  })
)
