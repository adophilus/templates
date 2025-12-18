import { Context, type Effect } from 'effect'
import type { Option } from 'effect'
import type { StorageFile } from '@/types'
import type {
  StorageRepositoryError,
  StorageRepositoryNotFoundError
} from './error'

export class StorageRepository extends Context.Tag('StorageRepository')<
  StorageRepository,
  {
    create: (
      payload: StorageFile.Insertable
    ) => Effect.Effect<StorageFile.Selectable, StorageRepositoryError>
    createMany: (
      payloads: StorageFile.Insertable[]
    ) => Effect.Effect<StorageFile.Selectable[], StorageRepositoryError>
    findById: (
      id: string
    ) => Effect.Effect<
      Option.Option<StorageFile.Selectable>,
      StorageRepositoryError
    >
    deleteById: (
      id: string
    ) => Effect.Effect<
      void,
      StorageRepositoryError | StorageRepositoryNotFoundError
    >
    findByUserId: (
      userId: string
    ) => Effect.Effect<StorageFile.Selectable[], StorageRepositoryError>
  }
>() {}
