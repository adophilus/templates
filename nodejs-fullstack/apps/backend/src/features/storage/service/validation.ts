import { Effect } from 'effect'
import type { FileSystem } from '@effect/platform'
import { StorageServiceValidationError, StorageServiceUploadError } from './error'

// Validation utilities that can be shared between implementations
export const validateFile = (
  file: FileSystem.File
): Effect.Effect<true, StorageServiceValidationError> =>
  Effect.gen(function* () {
    // For FileSystem.File size validation, we read the file to check size
    // We need to make sure all errors are mapped to StorageServiceValidationError
    const bytes = new Uint8Array(1) // Create a small buffer to read first bytes
    
    // Read the file using the Effect pipeline to properly handle errors
    const result = yield* file.read(bytes).pipe(
      Effect.mapError(() => 
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

    return true as const
  })

// Additional validation function for multiple files
export const validateFiles = (
  files: Array<FileSystem.File>
): Effect.Effect<true, StorageServiceValidationError> =>
  Effect.forEach(files, file => validateFile(file)).pipe(
    Effect.as(true as const)
  )