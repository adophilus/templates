import { Context, type Effect } from 'effect'
import type { StorageFile } from '@/types'
import type { StorageRepositoryOperationError } from './error'

export class StorageRepository extends Context.Tag('StorageRepository')<
  StorageRepository,
  {
    create: (payload: StorageFile.Insertable) => Effect.Effect<StorageFile.Selectable, StorageRepositoryOperationError>
    createMany: (payloads: StorageFile.Insertable[]) => Effect.Effect<StorageFile.Selectable[], StorageRepositoryOperationError>
    findById: (id: string) => Effect.Effect<StorageFile.Selectable | null, StorageRepositoryOperationError>
    deleteById: (id: string) => Effect.Effect<void, StorageRepositoryOperationError>
  }
>() { }
