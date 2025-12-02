import { Effect } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { GetProfileSuccessResponse } from '@nodejs-fullstack-template/api/Auth/GetProfileEndpoint'
import {
  CurrentUser,
  User
} from '@nodejs-fullstack-template/api/common/index'

export const GetProfileEndpointLive = HttpApiBuilder.handler(
  Api,
  'Auth',
  'getProfile',
  () =>
    Effect.gen(function* () {
      const user = yield* CurrentUser

      return GetProfileSuccessResponse.make({
        data: User.make(user)
      })
    })
)
