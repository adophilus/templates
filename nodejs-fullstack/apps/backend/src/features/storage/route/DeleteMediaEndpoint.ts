import { Effect } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { DeleteMediaSuccessResponse } from '@nodejs-fullstack-template/api/Storage/DeleteMediaEndpoint'
import FileNotFoundError from '@nodejs-fullstack-template/api/common/FileNotFoundError'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'
import { Storage } from '../service'

export const DeleteMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'deleteMedia',
  ({ path }) =>
    Effect.gen(function* () {
      const storage = yield* Storage

      yield* storage.delete(path.fileId).pipe(
        Effect.catchTags({
          StorageServiceNotFoundError: () => new FileNotFoundError(),
          StorageServiceError: () => new UnexpectedError()
        })
      )

      return new DeleteMediaSuccessResponse({})
    })
)
