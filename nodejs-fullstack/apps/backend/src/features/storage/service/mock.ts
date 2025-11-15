import { ulid } from 'ulidx'
import { Context, Effect, Layer, Option } from 'effect'
import { Storage } from './interface'
import {
  StorageServiceUploadError,
  StorageServiceValidationError,
  StorageServiceError,
  StorageServiceNotFoundError
} from './error'

export const MockStorage: Context.Tag.Service<Storage> = {
  upload: (payload) =>
    Effect.gen(function* () {
      const bytes = new Uint8Array()
      const size = yield* payload.read(bytes).pipe(
        Effect.catchAll(
          (err) =>
            new StorageServiceUploadError({
              message: 'Failed to upload file',
              cause: err
            })
        )
      )

      if (size.valueOf() === 0n) {
        return yield* Effect.fail(
          new StorageServiceValidationError({
            message: 'File size cannot be zero'
          })
        )
      }

      const id = ulid()

      return {
        id,
        source: 'mock',
        url: `http://mock.url/${id}`
      }
    }),

  uploadMany: (payloads) =>
    Effect.forEach(payloads, (payload) =>
      Effect.gen(function* () {
        const bytes = new Uint8Array()
        const size = yield* payload.read(bytes).pipe(
          Effect.catchAll(
            (err) =>
              new StorageServiceUploadError({
                message: 'Failed to upload file',
                cause: err
              })
          )
        )

        if (size.valueOf() === 0n) {
          return yield* Effect.fail(
            new StorageServiceValidationError({
              message: 'File size cannot be zero'
            })
          )
        }

        const id = ulid()

        return {
          id,
          source: 'mock',
          url: `http://mock.url/${id}`
        }
      })
    ),

  get: (id) =>
    Effect.gen(function* (_) {
      // For mock, we'll just return a mock media description if id exists
      const exists = id && id.length > 0 // simple check

      if (exists) {
        return Option.some({
          id,
          source: 'mock',
          url: `http://mock.url/${id}`
        })
      }

      return Option.none()
    }).pipe(
      Effect.catchAll((error) =>
        Effect.fail(
          new StorageServiceError({
            message: `Failed to get file: ${String(error)}`,
            cause: error
          })
        )
      )
    ),

  delete: (id) =>
    Effect.gen(function* (_) {
      // For mock, we'll consider any ID that's not a known "bad" ID as existing
      // If we had a list of valid IDs, we'd check against that
      // For now, let's just say if ID looks valid but "doesn't exist", throw not found
      if (!id || id.length === 0) {
        return yield* Effect.fail(
          new StorageServiceError({
            message: `Invalid file ID: ${id}`
          })
        )
      }

      // In a real implementation, this would check if file exists and throw StorageServiceNotFoundError if not
      // For mock purposes, let's simulate that sometimes a file doesn't exist
      if (id === 'non-existent-id') {
        yield* Effect.fail(
          new StorageServiceNotFoundError({
            message: `File with ID ${id} not found`
          })
        )
      }

      // Mock deletion - just succeed for valid IDs
      return void 0
    }).pipe(
      Effect.catchAll((error) => {
        if (
          error instanceof StorageServiceNotFoundError ||
          error instanceof StorageServiceError
        ) {
          return Effect.fail(error)
        }
        return Effect.fail(
          new StorageServiceError({
            message: `Failed to delete file: ${String(error)}`,
            cause: error
          })
        )
      })
    )
}

export const MockStorageLive = Layer.succeed(Storage, MockStorage)
