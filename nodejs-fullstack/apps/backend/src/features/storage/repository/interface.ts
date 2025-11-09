import { Result, type Unit } from 'true-myth'
import type { StorageFile } from '@/types'

export type StorageRepositoryError = 'ERR_UNEXPECTED'

export abstract class StorageRepository {
  public abstract create(
    payload: StorageFile.Insertable
  ): Promise<Result<StorageFile.Selectable, StorageRepositoryError>>
  public abstract createMany(
    payloads: StorageFile.Insertable[]
  ): Promise<Result<StorageFile.Selectable[], StorageRepositoryError>>
  public abstract findById(
    id: string
  ): Promise<Result<StorageFile.Selectable | null, StorageRepositoryError>>
  public abstract deleteById(
    id: string
  ): Promise<Result<Unit, StorageRepositoryError>>
}
