import { KyselyClient } from '@/features/database/kysely'
import { Effect, Layer } from 'effect'
import { StorageRepository } from './interface'
import { StorageRepositoryError } from './error'

export const KyselyStorageRepositoryLive = Layer.effect(
  StorageRepository,
  Effect.gen(function*(_) {
    const db = yield* KyselyClient

    return StorageRepository.of({
      create: (payload) =>
        Effect.gen(function*(_) {
          const file = yield* Effect.tryPromise({
            try: () =>
              db
                .insertInto('storage_files')
                .values(payload)
                .returningAll()
                .executeTakeFirstOrThrow(),
            catch: (error) =>
              new StorageRepositoryError({
                message: `Failed to create file: ${String(error)}`,
                cause: error
              })
          })

          return file
        }),

      createMany: (payloads) =>
        Effect.gen(function*(_) {
          const files = yield* Effect.tryPromise({
            try: () =>
              db
                .insertInto('storage_files')
                .values(payloads)
                .returningAll()
                .execute(),
            catch: (error) =>
              new StorageRepositoryError({
                message: `Failed to create multiple files: ${String(error)}`,
                cause: error
              })
          })

          return files
        }),

      findById: (id) =>
        Effect.gen(function*(_) {
          const result = yield* Effect.tryPromise({
            try: () =>
              db
                .selectFrom('storage_files')
                .where('id', '=', id)
                .selectAll()
                .executeTakeFirst(),
            catch: (error) =>
              new StorageRepositoryError({
                message: `Failed to find file by ID: ${String(error)}`,
                cause: error
              })
          })

          return result ?? null
        }),

      deleteById: (id) =>
        Effect.gen(function*(_) {
          yield* Effect.tryPromise({
            try: () =>
              db
                .deleteFrom('storage_files')
                .where('id', '=', id)
                .executeTakeFirst(),
            catch: (error) =>
              new StorageRepositoryError({
                message: `Failed to delete file by ID: ${String(error)}`,
                cause: error
              })
          })
        })
    })
  })
)
