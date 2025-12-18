import { type Context, Effect, Layer, Option } from 'effect'
import { StorageRepository } from './interface'
import type { StorageFile } from '@/types'

// In-memory storage for demonstration
const inMemoryStore = new Map<string, StorageFile.Selectable>()

export const InMemoryStorageRepository: Context.Tag.Service<StorageRepository> =
  {
    create: (payload) =>
      Effect.sync(() => {
        const fileRecord = {
          ...payload,
          id: payload.id,
          created_at: payload.created_at,
          updated_at: null
        }

        inMemoryStore.set(fileRecord.id, fileRecord)

        return fileRecord
      }),

    createMany: (payloads) =>
      Effect.forEach(payloads, (payload) =>
        Effect.sync(() => {
          const fileRecord = {
            ...payload,
            id: payload.id,
            created_at: payload.created_at,
            updated_at: null
          }

          inMemoryStore.set(fileRecord.id, fileRecord)

          return fileRecord
        })
      ),

    findById: (id) =>
      Effect.sync(() => {
        const file = inMemoryStore.get(id)
        return file ? Option.some(file) : Option.none()
      }),

    deleteById: (id) =>
      Effect.sync(() => {
        const existed = inMemoryStore.has(id)
        if (existed) {
          inMemoryStore.delete(id)
        }
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
      })
  }

export const InMemoryStorageRepositoryLive = Layer.succeed(
  StorageRepository,
  InMemoryStorageRepository
)
