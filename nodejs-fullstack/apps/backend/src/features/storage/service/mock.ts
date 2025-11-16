import { ulid } from 'ulidx'
import { Context, Effect, Layer, Option } from 'effect'
import { Storage } from './interface'
import { StorageServiceError, StorageServiceNotFoundError } from './error'
import { validateFile } from './validation'
import type { StorageFile } from '@/types'

export const MockStorage: Context.Tag.Service<Storage> = {
  upload: (payload) =>
    Effect.gen(function* () {
      // Use the shared validation function
      const validationInfo = yield* validateFile(payload)

      const id = ulid()

      return {
        id,
        mime_type: validationInfo.mimeType,
        original_name: 'mock-file',
        file_data: Buffer.from([]), // mock file data
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    }),

  uploadMany: (payloads) =>
    Effect.forEach(payloads, (payload) =>
      Effect.gen(function* () {
        // Use the shared validation function
        const validationInfo = yield* validateFile(payload)

        const id = ulid()

        return {
          id,
          mime_type: validationInfo.mimeType,
          original_name: 'mock-file',
          file_data: Buffer.from([]), // mock file data
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })
    ),

  get: (id) =>
    Effect.sync(() => {
      // For mock, we'll just return a mock StorageFile if id exists
      const exists = id && id.length > 0 // simple check

      if (exists) {
        return Option.some({
          id,
          mime_type: 'application/octet-stream',
          original_name: 'mock-file',
          file_data: Buffer.from([]), // mock file data
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }

      return Option.none()
    }),

  delete: (id) =>
    Effect.gen(function* () {
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
        return yield* Effect.fail(
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
    ),

  convertToMediaDescription: (payload) => ({
    id: payload.id,
    source: 'mock',
    url: `http://mock.url/${payload.id}`
  })
}

export const MockStorageLive = Layer.succeed(Storage, MockStorage)
