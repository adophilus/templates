import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { Storage } from '../service'
import { Effect } from 'effect'
import { ListMediaSuccessResponse } from '@nodejs-fullstack-template/api/Storage/ListMediaEndpoint'
import CurrentUser from '@nodejs-fullstack-template/api/common/CurrentUser'

export const ListMediaEndpoint = HttpApiBuilder.handler(
  Api,
  'Storage',
  'listMedia',
  () =>
    Effect.gen(function*() {
      const storage = yield* Storage
      const user = yield* CurrentUser

      const result = storage.findByUserId(user.id)

      return ListMediaSuccessResponse.make({
        data: []
      })
    })
)
