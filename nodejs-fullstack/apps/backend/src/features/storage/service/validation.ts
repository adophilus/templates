import { Effect } from 'effect'
import type { FileSystem } from '@effect/platform'
import { StorageServiceValidationError } from './error'

import { fileTypeFromBuffer } from 'file-type'

type ValidationInfo = {
  mimeType: string
}

// Validation utilities that can be shared between implementations
export const validateFile = (
  file: FileSystem.File
): Effect.Effect<ValidationInfo, StorageServiceValidationError> =>
  Effect.gen(function* () {
    // For file type validation and file size validation, we need to read more bytes to detect file type
    // Typically, the first 4100 bytes are enough for file-type detection
    const bytes = new Uint8Array(4100) // Read more bytes to properly detect file type

    // Read the file using the Effect pipeline to properly handle errors
    const result = yield* file.read(bytes).pipe(
      Effect.mapError(
        () =>
          new StorageServiceValidationError({
            message: 'Failed to read file for validation'
          })
      )
    )

    const actualSize = result.valueOf()

    // Check if file size is zero
    if (actualSize === 0n) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: 'File size cannot be zero'
        })
      )
    }

    // Check file size limit - using a reasonable default
    const maxFileSize = BigInt(10 * 1024 * 1024) // 10MB default as BigInt
    if (actualSize > maxFileSize) {
      return yield* Effect.fail(
        new StorageServiceValidationError({
          message: `File size exceeds maximum allowed size: ${maxFileSize} bytes`
        })
      )
    }

    // Detect file type from the buffer
    const fileTypeInfo = yield* Effect.tryPromise({
      try: () => fileTypeFromBuffer(bytes),
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
  files: Array<FileSystem.File>
): Effect.Effect<true, StorageServiceValidationError> =>
  Effect.forEach(files, (file) => validateFile(file)).pipe(
    Effect.as(true as const)
  )
