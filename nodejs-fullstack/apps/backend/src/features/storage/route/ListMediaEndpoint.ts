import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { Storage } from '../service'
import { Effect } from 'effect'
import { ListMediaSuccessResponse } from '@nodejs-fullstack-template/api/Storage/ListMediaEndpoint'
import CurrentUser from '@nodejs-fullstack-template/api/common/CurrentUser'
import UnexpectedError from '@nodejs-fullstack-template/api/common/UnexpectedError'

export const ListMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'listMedia',
  () =>
    Effect.gen(function* () {
      const storage = yield* Storage
      const user = yield* CurrentUser

      const result = (yield* storage.findByUserId(user.id)).map(
        storage.convertToMediaDescription
      )

      return ListMediaSuccessResponse.make({
        data: result
      })
    }).pipe(
      Effect.catchTags({
        StorageServiceError: (error) =>
          new UnexpectedError({ message: error.message })
      })
    )
)
