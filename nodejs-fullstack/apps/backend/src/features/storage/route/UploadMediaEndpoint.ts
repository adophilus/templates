import { Effect } from 'effect'
import { HttpApiBuilder, FileSystem } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { UploadMediaSuccessResponse } from '@nodejs-fullstack-template/docs-openapi/Storage/UploadMediaEndpoint'
import MediaDescription from '@nodejs-fullstack-template/docs-openapi/common/MediaDescription'
import { Storage } from '../service'
import UnexpectedError from '@nodejs-fullstack-template/docs-openapi/common/UnexpectedError'
import { basename } from 'node:path'

export const UploadMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'uploadMedia',
  ({ payload }) =>
    Effect.gen(function* () {
      const storage = yield* Storage
      const fs = yield* FileSystem.FileSystem

      const convertedFiles = yield* Effect.forEach(payload.files, (file) =>
        Effect.gen(function* () {
          const bytes = yield* fs.readFile(file.path)
          return new File([Buffer.from(bytes)], basename(file.path))
        }).pipe(Effect.mapError(() => new UnexpectedError()))
      )

      const files = yield* Effect.forEach(convertedFiles, (file) =>
        storage.upload(file).pipe(
          Effect.mapError(() => {
            return new UnexpectedError()
          })
        )
      )

      return new UploadMediaSuccessResponse({
        data: files.map((file) =>
          MediaDescription.make(storage.convertToMediaDescription(file))
        )
      })
    })
)
