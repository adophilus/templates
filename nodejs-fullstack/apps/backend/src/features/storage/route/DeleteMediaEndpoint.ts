import { Effect } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { Success } from '@nodejs-fullstack-template/docs-openapi/Storage/DeleteMediaEndpoint'
import FileNotFoundError from '@nodejs-fullstack-template/docs-openapi/common/FileNotFoundError'
import UnexpectedError from '@nodejs-fullstack-template/docs-openapi/common/UnexpectedError'
import { Storage } from '../service'

export const DeleteMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'deleteMedia',
  ({ path }) =>
    Effect.gen(function* () {
      const storage = yield* Storage

      yield* storage.delete(path.fileId).pipe(
        Effect.catchTag(
          'StorageServiceNotFoundError',
          () => new FileNotFoundError()
        ),
        Effect.mapError(() => new UnexpectedError())
      )

      return Success.make({
        code: 'FILE_DELETED',
        message: `File ${path.fileId} deleted successfully`
      })
    })
)
