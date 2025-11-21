import { Effect, Layer, Option } from 'effect'
import { KyselyClient } from '@/features/database/kysely'
import { AuthUserRepository } from './interface'
import {
  AuthUserRepositoryError,
  AuthUserRepositoryNotFoundError
} from './error'
import type { AuthUser } from '@/types'

export const KyselyAuthUserRepositoryLive = Layer.effect(
  AuthUserRepository,
  Effect.gen(function*(_) {
    const db = yield* KyselyClient

    return AuthUserRepository.of({
      create: (payload) =>
        Effect.gen(function*(_) {
          const user = yield* Effect.tryPromise({
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
          })

          return user
        }),

      findByEmail: (email) =>
        Effect.gen(function*(_) {
          const user = yield* Effect.tryPromise({
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
          })

          return user ? Option.some(user) : Option.none()
        }),

      findByReferralCode: (referralCode) =>
        Effect.gen(function*(_) {
          const user = yield* Effect.tryPromise({
            try: () =>
              db
                .selectFrom('auth_users')
                .selectAll()
                .where('referral_code', '=', referralCode)
                .executeTakeFirst(),
            catch: (error) =>
              new AuthUserRepositoryError({
                message: `Failed to find user by referral code: ${String(error)}`,
                cause: error
              })
          })

          return user ? Option.some(user) : Option.none()
        }),

      findById: (id) =>
        Effect.gen(function*(_) {
          const user = yield* Effect.tryPromise({
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
          })

          return user ? Option.some(user) : Option.none()
        }),

      updateById: (id, payload) =>
        Effect.gen(function*(_) {
          const user = yield* Effect.tryPromise({
            try: () =>
              db
                .updateTable('auth_users')
                .set({
                  ...payload,
                  updated_at: new Date().toISOString()
                })
                .where('id', '=', id)
                .returningAll()
                .executeTakeFirstOrThrow(),
            catch: (error) =>
              new AuthUserRepositoryError({
                message: `Failed to update user by ID: ${String(error)}`,
                cause: error
              })
          })

          return user;
        }),

      deleteById: (id) =>
        Effect.gen(function*(_) {
          yield* Effect.tryPromise({
            try: () =>
              db
                .deleteFrom('auth_users')
                .where('id', '=', id)
                .executeTakeFirst(),
            catch: (error) =>
              new AuthUserRepositoryError({
                message: `Failed to delete user by ID: ${String(error)}`,
                cause: error
              })
          })
        })
    })
  })
)