import { Effect, Layer, Option } from 'effect'
import { HttpServerRequest, HttpServerResponse } from '@effect/platform'
import { Storage } from '../service'

// Storage API implementation that connects API endpoints to service methods
export class StorageApiImpl {
  // Upload media files
  static uploadMedia = Effect.gen(function* (_) {
    const storage = yield* Storage
    return (request: HttpServerRequest.HttpServerRequest) =>
      Effect.gen(function* (_) {
        // Parse multipart form data for file uploads
        const formData = yield* request.multipart
        const filesRaw = formData.get('files')

        let files: File[] = []
        if (filesRaw instanceof File) {
          files = [filesRaw]
        } else if (Array.isArray(filesRaw)) {
          files = filesRaw as File[]
        }

        // Upload files using the storage service
        const results = yield* Effect.forEach(files, (file) =>
          storage.upload(file)
        )

        return HttpServerResponse.json({
          code: 'MEDIA_UPLOADED',
          data: results
        })
      })
  }).pipe(
    Effect.flatMap((fn) => fn),
    Layer.unwrapEffect
  )

  // Get a file by ID
  static getFile = Effect.gen(function* (_) {
    const storage = yield* Storage
    return (fileId: string) =>
      Effect.gen(function* (_) {
        const fileOption = yield* storage.get(fileId)

        if (Option.isNone(fileOption)) {
          return HttpServerResponse.json(
            { error: 'File not found' },
            { status: 404 }
          )
        }

        // In a real implementation, return the actual file content
        const file = fileOption.value
        return HttpServerResponse.empty()
      })
  }).pipe(
    Effect.flatMap((fn) => fn),
    Layer.unwrapEffect
  )

  // Delete a file by ID
  static deleteFile = Effect.gen(function* (_) {
    const storage = yield* Storage
    return (fileId: string) =>
      Effect.gen(function* (_) {
        yield* storage.delete(fileId)
        return HttpServerResponse.json({
          code: 'FILE_DELETED',
          message: `File ${fileId} deleted successfully`
        })
      })
  }).pipe(
    Effect.flatMap((fn) => fn),
    Layer.unwrapEffect
  )
}

// Export the layer that provides all storage API implementations
export const StorageApiImplLive = Layer.mergeAll(
  StorageApiImpl.uploadMedia,
  StorageApiImpl.getFile,
  StorageApiImpl.deleteFile
)
