import { Effect, Layer } from 'effect'
import { HttpApi, HttpApiBuilder, HttpServerResponse } from '@effect/platform'
import { Storage } from '../service'
import { StorageApi } from '@nodejs-fullstack-template/docs-openapi'

// Define the storage API server implementation
const StorageApiServer = StorageApi.pipe(
  // Handle the uploadMedia endpoint
  HttpApiBuilder.handle('uploadMedia')((api) =>
    Effect.gen(function* (_) {
      const storage = yield* Storage

      // Extract files from the payload
      const files = api.payload.files

      // Upload each file using the storage service
      const results = yield* Effect.forEach(files, (file) =>
        storage.upload(file)
      )

      return HttpServerResponse.json({
        code: 'MEDIA_UPLOADED',
        data: results
      })
    })
  ),

  // Handle the getFile endpoint
  HttpApiBuilder.handle('getFile')((api) =>
    Effect.gen(function* (_) {
      const storage = yield* Storage

      // Get file by ID using the storage service
      const fileOption = yield* storage.get(api.path.fileId)

      // In a real implementation, serve the file content
      // For now, return a placeholder response
      if (fileOption._tag === 'None') {
        return HttpServerResponse.empty({ status: 404 })
      }

      // Return file content (in a real implementation you'd return the actual file data)
      return HttpServerResponse.empty()
    })
  ),

  // Handle the deleteFile endpoint
  HttpApiBuilder.handle('deleteFile')((api) =>
    Effect.gen(function* (_) {
      const storage = yield* Storage

      // Delete file by ID using the storage service
      yield* storage.delete(api.path.fileId)

      return HttpServerResponse.json({
        code: 'FILE_DELETED',
        message: `File ${api.path.fileId} deleted successfully`
      })
    })
  )
)

// Export the storage API server as a Layer
export const StorageHttpServerLive = StorageApiServer.pipe(
  HttpApiBuilder.withServer,
  Layer.provide(Storage)
)
