import { Effect } from 'effect'
import { HttpApiBuilder, FileSystem } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { UploadMediaSuccessResponse } from '@nodejs-fullstack-template/api/Storage/UploadMediaEndpoint'
import { Storage } from '../service'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'
import { CurrentUser } from '@nodejs-fullstack-template/api/common/index'
import { basename } from 'node:path'

export const UploadMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'uploadMedia',
  ({ payload }) =>
    Effect.gen(function* () {
      const storage = yield* Storage
      const fs = yield* FileSystem.FileSystem
      const currentUser = yield* CurrentUser

      const convertedFiles = yield* Effect.forEach(payload.files, (file) =>
        Effect.gen(function* () {
          const bytes = yield* fs.readFile(file.path)
          return new File([Buffer.from(bytes)], basename(file.path))
        }).pipe(
          Effect.mapError(
            (err) =>
              new UnexpectedError({
                message: err.message
              })
          )
        )
      )

      const files = yield* Effect.forEach(convertedFiles, (file) =>
        storage.upload(file, currentUser.id).pipe(
          Effect.mapError((err) => {
            return new UnexpectedError({
              message: err.message
            })
          })
        )
      )

      return new UploadMediaSuccessResponse({
        data: files.map(storage.convertToMediaDescription)
      })
    })
)
