import { Context, type Effect, type Option } from 'effect'
import type { MediaDescription, StorageFile } from '@/types'
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
      StorageFile.Selectable,
      StorageServiceValidationError | StorageServiceUploadError
    >
    uploadMany: (
      payload: Array<File>
    ) => Effect.Effect<
      Array<StorageFile.Selectable>,
      StorageServiceValidationError | StorageServiceUploadError
    >
    get: (
      id: string
    ) => Effect.Effect<
      Option.Option<StorageFile.Selectable>,
      StorageServiceError
    >
    delete: (
      id: string
    ) => Effect.Effect<void, StorageServiceNotFoundError | StorageServiceError>
    convertToMediaDescription(payload: StorageFile.Selectable): MediaDescription
  }
>() {}
