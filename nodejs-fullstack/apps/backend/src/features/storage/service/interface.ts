import { Context, type Effect, type Option } from 'effect'
import type { StorageFile } from '@/types'
import type {
  StorageServiceError,
  StorageServiceNotFoundError,
  StorageServiceUploadError,
  StorageServiceValidationError
} from './error'
import type MediaDescription from '@nodejs-fullstack-template/api/common/MediaDescription'

export class Storage extends Context.Tag('StorageService')<
  Storage,
  {
    upload: (
      payload: File,
      userId: string
    ) => Effect.Effect<
      StorageFile.Selectable,
      StorageServiceValidationError | StorageServiceUploadError
    >
    uploadMany: (
      payload: Array<File>,
      userId: string
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
    findByUserId: (
      userId: string
    ) => Effect.Effect<StorageFile.Selectable[], StorageServiceError>
    convertToMediaDescription(payload: StorageFile.Selectable): MediaDescription
  }
>() {}
