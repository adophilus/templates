import { StorageRepository } from '../repository/interface'
import {
  StorageServiceUploadError,
  StorageServiceError,
  StorageServiceNotFoundError
} from './error'
import { ulid } from 'ulidx'
import { Effect, Layer } from 'effect'
import { Storage } from './interface'
import { config } from '@/features/config'
import { validateFile } from './validation'
import MediaDescription from '@nodejs-fullstack-template/api/common/MediaDescription'

export const SqliteStorageLive = Layer.effect(
  Storage,
  Effect.gen(function* () {
    const repository = yield* StorageRepository

    return Storage.of({
      upload: (payload, userId) =>
        Effect.gen(function* () {
          // Use the shared validation function which returns ValidationInfo with mimeType
          const validationInfo = yield* validateFile(payload)

          // Convert the File to ArrayBuffer and then to Buffer
          const arrayBuffer = yield* Effect.tryPromise({
            try: () => payload.arrayBuffer(),
            catch: (error) =>
              new StorageServiceUploadError({
                message: `Failed to read file buffer: ${String(error)}`,
                cause: error
              })
          })

          // Convert ArrayBuffer to Buffer
          const fileBuffer = Buffer.from(arrayBuffer)

          // Create the file record in the database using the repository
          const uploadedFile = yield* repository
            .create({
              id: ulid(),
              mime_type: validationInfo.mimeType,
              original_name: payload.name,
              file_data: fileBuffer,
              user_id: userId, // Include the user ID
              created_at: Math.round(Date.now() / 1000)
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

          return uploadedFile
        }),

      uploadMany: (payloads, userId) =>
        Effect.forEach(payloads, (payload) =>
          Effect.gen(function* () {
            // Use the shared validation function which returns ValidationInfo with mimeType
            const validationInfo = yield* validateFile(payload)

            // Convert the File to ArrayBuffer and then to Buffer
            const arrayBuffer = yield* Effect.tryPromise({
              try: () => payload.arrayBuffer(),
              catch: (error) =>
                new StorageServiceUploadError({
                  message: `Failed to read file buffer: ${String(error)}`,
                  cause: error
                })
            })

            // Convert ArrayBuffer to Buffer
            const fileBuffer = Buffer.from(arrayBuffer)

            // Create the file record in the database using the repository
            const uploadedFile = yield* repository
              .create({
                id: ulid(),
                mime_type: validationInfo.mimeType,
                original_name: payload.name,
                file_data: fileBuffer,
                user_id: userId, // Include the user ID
                created_at: Math.round(Date.now() / 1000)
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

            return uploadedFile
          })
        ),

      get: (id) =>
        repository.findById(id).pipe(
          Effect.mapError(
            (error) =>
              new StorageServiceError({
                message: `Database operation failed: ${String(error)}`,
                cause: error
              })
          )
        ),

      delete: (id) =>
        repository.deleteById(id).pipe(
          Effect.catchTags({
            StorageRepositoryNotFoundError: (error) =>
              new StorageServiceNotFoundError({
                message: `File with ID ${id} not found`,
                cause: error
              }),
            StorageRepositoryError: (error) =>
              new StorageServiceError({
                message: `Database operation failed: ${String(error)}`,
                cause: error
              })
          })
        ),

      convertToMediaDescription: (payload) =>
        new MediaDescription({
          id: payload.id,
          source: 'cloud',
          url: `${config.server.url}/storage/${payload.id}`
        })
    })
  })
)
