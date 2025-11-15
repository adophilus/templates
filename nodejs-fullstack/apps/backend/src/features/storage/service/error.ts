import { Data } from 'effect'

export class StorageUploadError extends Data.TaggedError('StorageUploadError')<{
  message: string
  cause?: unknown
}> { }

export class StorageValidationError extends Data.TaggedError('StorageValidationError')<{
  message: string
  cause?: unknown
}> { }

export class StorageDatabaseError extends Data.TaggedError('StorageDatabaseError')<{
  message: string
  cause?: unknown
}> { }

export class StorageFileError extends Data.TaggedError('StorageFileError')<{
  message: string
  cause?: unknown
}> { }

export type UploadFileError = 
  | StorageUploadError 
  | StorageValidationError 
  | StorageDatabaseError
  | StorageFileError