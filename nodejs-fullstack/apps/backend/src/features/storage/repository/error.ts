import { Data } from 'effect'

export class StorageRepositoryError extends Data.TaggedError(
  'StorageRepositoryError'
)<{
  message: string
  cause?: unknown
}> {}

export class StorageRepositoryNotFoundError extends Data.TaggedError(
  'StorageRepositoryNotFoundError'
)<{
  message: string
  cause?: unknown
}> {}

export type StorageRepositoryOperationError =
  | StorageRepositoryError
  | StorageRepositoryNotFoundError
