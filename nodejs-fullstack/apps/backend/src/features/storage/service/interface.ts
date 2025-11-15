import { Context, type Effect, type Option } from 'effect'
import type { MediaDescription } from '@/types'
import type {
  StorageServiceError,
  StorageServiceNotFoundError,
  StorageServiceUploadError,
  StorageServiceValidationError
} from './error'

export class Storage extends Context.Tag('StorageService')<
  Storage,
  {
    upload: (
      payload: File
    ) => Effect.Effect<
      MediaDescription,
      StorageServiceValidationError | StorageServiceUploadError
    >
    get: (
      id: string
    ) => Effect.Effect<Option.Option<MediaDescription>, StorageServiceError>
    delete: (
      id: string
    ) => Effect.Effect<void, StorageServiceNotFoundError | StorageServiceError>
  }
>() {}
