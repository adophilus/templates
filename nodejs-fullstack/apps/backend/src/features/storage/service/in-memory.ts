import { ulid } from 'ulidx'
import { type Context, Effect, Layer, Option } from 'effect'
import { Storage } from './interface'
import { StorageServiceNotFoundError } from './error'
import { validateFile } from './validation'
import type { StorageFile } from '@/types'

const inMemoryStore = new Map<string, StorageFile.Selectable>()

export const InMemoryStorage: Context.Tag.Service<Storage> = {
  upload: (payload, userId) =>
    Effect.gen(function* () {
      const validationInfo = yield* validateFile(payload)

      const id = ulid()

      const fileRecord: StorageFile.Selectable = {
        id,
        mime_type: validationInfo.mimeType,
        original_name: payload.name,
        file_data: Buffer.from([]), // In-memory implementation doesn't store real data for demo
        user_id: userId, // Add user_id field
        created_at: Math.round(Date.now() / 1000),
        updated_at: null
      }

      inMemoryStore.set(id, fileRecord)

      return fileRecord
    }),

  uploadMany: (payloads, userId) =>
    Effect.forEach(payloads, (payload) =>
      Effect.gen(function* () {
        const validationInfo = yield* validateFile(payload)

        const id = ulid()

        const fileRecord: StorageFile.Selectable = {
          id,
          mime_type: validationInfo.mimeType,
          original_name: payload.name,
          file_data: Buffer.from([]), // In-memory implementation doesn't store real data for demo
          user_id: userId, // Add user_id field
          created_at: Math.round(Date.now() / 1000),
          updated_at: null
        }

        inMemoryStore.set(id, fileRecord)

        return fileRecord
      })
    ),

  get: (id) =>
    Effect.sync(() => {
      const file = inMemoryStore.get(id)
      return file ? Option.some(file) : Option.none()
    }),

  delete: (id) =>
    Effect.gen(function* () {
      const existed = inMemoryStore.has(id)
      if (!existed) {
        return yield* Effect.fail(
          new StorageServiceNotFoundError({
            message: `File with ID ${id} not found`
          })
        )
      }

      inMemoryStore.delete(id)
      return void 0
    }),

  findByUserId: (userId) =>
    Effect.sync(() => {
      const files: StorageFile.Selectable[] = []
      for (const file of inMemoryStore.values()) {
        if (file.user_id === userId) {
          files.push(file)
        }
      }
      return files
    }),

  convertToMediaDescription: (payload) => ({
    id: payload.id,
    source: 'in-memory',
    url: `http://in-memory.url/${payload.id}`
  })
}

export const InMemoryStorageLive = Layer.succeed(Storage, InMemoryStorage)
