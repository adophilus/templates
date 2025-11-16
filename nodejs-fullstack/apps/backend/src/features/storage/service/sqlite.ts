import { StorageRepository } from '../repository/interface'
import {
  StorageRepositoryNotFoundError
} from '../repository/error'
import {
  StorageServiceUploadError,
  StorageServiceError,
  StorageServiceNotFoundError
} from './error'
import { ulid } from 'ulidx'
import { Effect, Layer, Option } from 'effect'
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
          const validationInfo = yield* validateFile(payload)

          const bytes = new Uint8Array()
          const readResult = yield* payload.read(bytes).pipe(
            Effect.catchAll(
              (err) =>
                new StorageServiceUploadError({
                  message: `Failed to read file: ${String(err)}`,
                  cause: err
                })
            )
          )

          const actualSize = readResult.valueOf()
          const fileBytes = bytes.slice(0, Number(actualSize))

          const uploadedFile = yield* repository
            .create({
              id: ulid(),
              mime_type: validationInfo.mimeType,
              original_name: 'unnamed',
              file_data: Buffer.from(fileBytes)
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

          // Return the StorageFile.Selectable directly from the repository
          return uploadedFile
        }),

      uploadMany: (payloads) =>
        Effect.forEach(payloads, (payload) =>
          Effect.gen(function* () {
            const validationInfo = yield* validateFile(payload)

            const bytes = new Uint8Array(4100)
            const readResult = yield* payload.read(bytes).pipe(
              Effect.catchAll(
                (err) =>
                  new StorageServiceUploadError({
                    message: `Failed to read file: ${String(err)}`,
                    cause: err
                  })
              )
            )

            const actualSize = readResult.valueOf()
            const fileBytes = bytes.slice(0, Number(actualSize))

            const uploadedFile = yield* repository
              .create({
                id: ulid(),
                mime_type: validationInfo.mimeType,
                original_name: 'unnamed',
                file_data: Buffer.from(fileBytes)
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

            // Return the StorageFile.Selectable directly from the repository
            return uploadedFile
          })
        ),

      get: (id) =>
        Effect.gen(function* () {
          const result = yield* repository.findById(id)

          // Return the StorageFile.Selectable directly from the repository
          return result
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
        ),

      convertToMediaDescription: (payload) => ({
        id: payload.id,
        source: 'cloud',
        url: `${config.server.url}/storage/${payload.id}`
      })
    })
  })
)

export const SqliteStorageLive = sqliteStorageLive
