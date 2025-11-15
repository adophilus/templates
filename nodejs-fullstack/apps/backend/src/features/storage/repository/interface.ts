import { Context, type Effect } from 'effect'
import type { StorageFile } from '@/types'
import { 
  StorageRepositoryError, 
  StorageRepositoryNotFoundError,
  StorageRepositoryValidationError,
  StorageRepositoryConstraintError
} from './error'

export class StorageRepository extends Context.Tag('StorageRepository')<
  StorageRepository,
  {
    create: (payload: StorageFile.Insertable) => Effect.Effect<StorageFile.Selectable, StorageRepositoryError | StorageRepositoryValidationError | StorageRepositoryConstraintError>
    createMany: (payloads: StorageFile.Insertable[]) => Effect.Effect<StorageFile.Selectable[], StorageRepositoryError | StorageRepositoryValidationError | StorageRepositoryConstraintError>
    findById: (id: string) => Effect.Effect<StorageFile.Selectable | null, StorageRepositoryError>
    deleteById: (id: string) => Effect.Effect<void, StorageRepositoryError | StorageRepositoryNotFoundError>
  }
>() { }
