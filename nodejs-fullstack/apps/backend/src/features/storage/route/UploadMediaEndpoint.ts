import { Effect } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { Success } from '@nodejs-fullstack-template/docs-openapi/Storage/UploadMediaEndpoint'
import MediaDescription from '@nodejs-fullstack-template/docs-openapi/common/MediaDescription'
import { Storage } from '../service'
import BadRequestError from '@nodejs-fullstack-template/docs-openapi/common/BadRequestError'
import UnexpectedError from '@nodejs-fullstack-template/docs-openapi/common/UnexpectedError'

export const UploadMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'uploadMedia',
  ({ payload }) =>
    Effect.gen(function* () {
      const storage = yield* Storage

      const files = yield* Effect.forEach(payload.files, (file) =>
        storage.upload(file).pipe(
          Effect.catchTags({
            StorageServiceUploadError: () => new UnexpectedError(),
            StorageServiceValidationError: () => new BadRequestError()
          })
        )
      )

      return Success.make({
        code: 'MEDIA_UPLOADED',
        data: files.map((file) => MediaDescription.make(file))
      })
    })
)

//   // Handle file retrieval
//   const getHandler = (fileId: string) =>
//     Effect.gen(function*(_) {
//       const fileOption = yield* storage.get(fileId)
//
//       if (Option.isNone(fileOption)) {
//         return HttpServerResponse.json(
//           { error: 'File not found' },
//           { status: 404 }
//         )
//       }
//
//       // In a real implementation, return the actual file content
//       const file = fileOption.value
//       return HttpServerResponse.empty()
//     })
//
//   // Handle file deletion
//   const deleteHandler = (fileId: string) =>
//     Effect.gen(function*(_) {
//       yield* storage.delete(fileId)
//       return HttpServerResponse.json({
//         code: 'FILE_DELETED',
//         message: `File ${fileId} deleted successfully`
//       })
//     })
//
//   // Add routes to the router
//   yield* router.post('/upload', HttpServerRouter.fromEffect(uploadHandler))
//   yield* router.get(
//     '/:fileId',
//     HttpServerRouter.fromEffect((request) => getHandler(request.params.fileId))
//   )
//   yield* router.delete(
//     '/:fileId',
//     HttpServerRouter.fromEffect((request) =>
//       deleteHandler(request.params.fileId)
//     )
//   )
//
//   return router
