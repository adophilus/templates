import { StorageRepository } from '../repository/interface'
import {
  StorageRepositoryError,
  StorageRepositoryNotFoundError
} from '../repository/error'
import {
  StorageServiceUploadError,
  StorageServiceError,
  StorageServiceValidationError,
  StorageServiceNotFoundError
} from './error'
import { ulid } from 'ulidx'
import { Effect, Layer, Option } from 'effect'
import type { FileSystem } from '@effect/platform'
import { Storage } from './interface'
import { config } from '@/features/config'
import { validateFile } from './validation'

export const sqliteStorageLive = Layer.effect(
  Storage,
  Effect.gen(function* (_) {
    const repository = yield* StorageRepository

    return Storage.of({
      upload: (payload) =>
        Effect.gen(function* () {
          // Validate the file first
          yield* validateFile(payload)

          // Convert file to buffer - need to handle FileSystem.File differently
          const bytes = new Uint8Array()
          yield* payload.read(bytes).pipe(
            Effect.catchAll(
              (err) =>
                new StorageServiceUploadError({
                  message: `Failed to read file: ${String(err)}`,
                  cause: err
                })
            )
          )

          // Create the file record in the database using the repository from context
          const uploadedFile = yield* repository
            .create({
              id: ulid(),
              mime_type: (payload as any).type || 'application/octet-stream', // TODO: Get proper mime type
              original_name: (payload as any).name || 'unnamed', // TODO: Get proper name
              file_data: Buffer.from(bytes) // This is a simplification
            })
            .pipe(
              Effect.mapError(
                (error) =>
                  new StorageServiceUploadError({
                    message: `Upload operation failed: ${String(error)}`,
                    cause: error
                  })
              )
            )

          const id = uploadedFile.id

          return {
            id,
            source: 'cloud',
            url: `${config.server.url}/storage/${id}`
          }
        }),
      
      uploadMany: (payloads) =>
        Effect.forEach(payloads, (payload) =>
          Effect.gen(function* () {
            // Validate the file first
            yield* validateFile(payload)

            // Convert file to buffer - need to handle FileSystem.File differently
            const bytes = new Uint8Array()
            yield* payload.read(bytes).pipe(
              Effect.catchAll(
                (err) =>
                  new StorageServiceUploadError({
                    message: `Failed to read file: ${String(err)}`,
                    cause: err
                  })
              )
            )

            // Create the file record in the database using the repository from context
            const uploadedFile = yield* repository
              .create({
                id: ulid(),
                mime_type: (payload as any).type || 'application/octet-stream', // TODO: Get proper mime type
                original_name: (payload as any).name || 'unnamed', // TODO: Get proper name
                file_data: Buffer.from(bytes) // This is a simplification
              })
              .pipe(
                Effect.mapError(
                  (error) =>
                    new StorageServiceUploadError({
                      message: `Upload operation failed: ${String(error)}`,
                      cause: error
                    })
                )
              )

            const id = uploadedFile.id

            return {
              id,
              source: 'cloud',
              url: `${config.server.url}/storage/${id}`
            }
          })
        ),

      get: (id) =>
        Effect.gen(function* () {
          const result = yield* repository.findById(id)

          // Transform StorageFile to MediaDescription within the Option
          const mappedResult = Option.map(result, (file) => ({
            id: file.id,
            source: 'cloud',
            url: `${config.server.url}/storage/${file.id}`
          }))

          return mappedResult
        }).pipe(
          Effect.mapError(
            (error) =>
              new StorageServiceError({
                message: `Database operation failed: ${String(error)}`,
                cause: error
              })
          )
        ),

      delete: (id) =>
        Effect.gen(function* () {
          yield* repository.deleteById(id)
        }).pipe(
          Effect.mapError((error) => {
            if (error instanceof StorageRepositoryNotFoundError) {
              return new StorageServiceNotFoundError({
                message: `File with ID ${id} not found`,
                cause: error
              })
            }
            return new StorageServiceError({
              message: `Database operation failed: ${String(error)}`,
              cause: error
            })
          })
        )
    })
  })
)

export const SqliteStorageLive = sqliteStorageLive
