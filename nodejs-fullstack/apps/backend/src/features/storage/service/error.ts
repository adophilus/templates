import { Data } from 'effect'

export class StorageServiceUploadError extends Data.TaggedError(
  'StorageUploadError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceValidationError extends Data.TaggedError(
  'StorageValidationError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceError extends Data.TaggedError(
  'StorageDatabaseError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceNotFoundError extends Data.TaggedError(
  'StorageFileError'
)<{
  message: string
  cause?: unknown
}> { }

export type StorageServiceOperationError =
  | StorageServiceUploadError
  | StorageServiceValidationError
  | StorageServiceError
  | StorageServiceNotFoundError

