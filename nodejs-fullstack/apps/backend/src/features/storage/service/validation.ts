import { Effect } from 'effect'
import { StorageServiceValidationError } from './error'
import { fileTypeFromBuffer } from 'file-type'

type ValidationInfo = {
  mimeType: string
}

export const validateFile = (
  file: File
): Effect.Effect<ValidationInfo, StorageServiceValidationError> =>
  Effect.gen(function* () {
    if (!file.name) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: 'File name is required'
        })
      )
    }

    if (file.size === 0) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: 'File size cannot be zero'
        })
      )
    }

    const maxFileSize = 10 * 1024 * 1024 // 10MB default in bytes
    if (file.size > maxFileSize) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: `File size exceeds maximum allowed size: ${maxFileSize} bytes`
        })
      )
    }

    const arrayBuffer = yield* Effect.tryPromise({
      try: () => file.arrayBuffer(),
      catch: (error) =>
        new StorageServiceValidationError({
          message: `Failed to read file for validation: ${String(error)}`
        })
    })

    const uint8Array = new Uint8Array(arrayBuffer.slice(0, 4100)) // Take first 4100 bytes for detection

    const fileTypeInfo = yield* Effect.tryPromise({
      try: () => fileTypeFromBuffer(uint8Array),
      catch: (error) =>
        new StorageServiceValidationError({
          message: `Failed to detect file type: ${String(error)}`
        })
    })

    if (!fileTypeInfo) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message:
            'File type could not be detected - file may be corrupted or invalid'
        })
      )
    }

    if (!fileTypeInfo.mime.startsWith('image/')) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: `Unsupported file type: ${fileTypeInfo.mime}`
        })
      )
    }

    return { mimeType: fileTypeInfo.mime }
  })

export const validateFiles = (
  files: Array<File>
): Effect.Effect<true, StorageServiceValidationError> =>
  Effect.forEach(files, (file) => validateFile(file)).pipe(
    Effect.as(true as const)
  )
