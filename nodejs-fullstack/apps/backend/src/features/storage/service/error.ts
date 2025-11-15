import { Data } from 'effect'

export class StorageServiceUploadError extends Data.TaggedError(
  'StorageServiceUploadError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceValidationError extends Data.TaggedError(
  'StorageServiceValidationError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceError extends Data.TaggedError(
  'StorageServiceError'
)<{
  message: string
  cause?: unknown
}> { }

export class StorageServiceNotFoundError extends Data.TaggedError(
  'StorageServiceNotFoundError'
)<{
  message: string
  cause?: unknown
}> { }

export type StorageServiceOperationError =
  | StorageServiceUploadError
  | StorageServiceValidationError
  | StorageServiceError
  | StorageServiceNotFoundError

