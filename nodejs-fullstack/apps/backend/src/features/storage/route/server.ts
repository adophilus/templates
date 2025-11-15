import { Context, Effect, Layer, Option } from 'effect'
import {
  HttpApi,
  HttpApiBuilder,
  HttpServerRequest,
  HttpServerResponse
} from '@effect/platform'
import { Storage } from '../service'
import { StorageApi } from '@nodejs-fullstack-template/docs-openapi'

// Create a context tag for the Storage API Handler
export class StorageApiHandler extends Context.Tag('StorageApiHandler')<
  StorageApiHandler,
  {
    readonly uploadMedia: (
      files: File[]
    ) => Effect.Effect<
      ReadonlyArray<{ id: string; source: string; url: string }>,
      unknown
    >

    readonly getFile: (fileId: string) => Effect.Effect<Uint8Array, unknown> // Return file content as bytes

    readonly deleteFile: (fileId: string) => Effect.Effect<void, unknown>
  }
>() {}

// Create the implementation layer for the storage API handlers
export const StorageApiHandlerLive = Layer.effect(
  StorageApiHandler,
  Effect.gen(function* (_) {
    const storage = yield* Storage

    return StorageApiHandler.of({
      uploadMedia: (files) =>
        Effect.forEach(files, (file) => storage.upload(file)),

      getFile: (fileId) =>
        Effect.gen(function* (_) {
          const fileOption = yield* storage.get(fileId)

          if (Option.isNone(fileOption)) {
            // This will be caught and converted to 404 by the API framework
            return yield* Effect.fail(new Error('File not found'))
          }

          const file = fileOption.value

          // In a real implementation, you'd fetch the actual file content from storage
          // For now, return empty content - this is just the API structure
          return new Uint8Array()
        }),

      deleteFile: (fileId) => storage.delete(fileId)
    })
  })
)

// Create the HTTP server layer by combining the API definition with handlers
export const StorageHttpServerLive = StorageApi.pipe(
  HttpApiBuilder.handle('uploadMedia')((api) =>
    StorageApiHandler.Live.pipe(
      Effect.flatMap((handler) => handler.uploadMedia(api.payload.files))
    )
  ),
  HttpApiBuilder.handle('getFile')((api) =>
    StorageApiHandler.Live.pipe(
      Effect.flatMap((handler) => handler.getFile(api.path.fileId))
    )
  ),
  HttpApiBuilder.handle('deleteFile')((api) =>
    StorageApiHandler.Live.pipe(
      Effect.flatMap((handler) => handler.deleteFile(api.path.fileId))
    )
  ),
  HttpApiBuilder.withServer,
  Layer.provide(StorageApiHandlerLive)
)
