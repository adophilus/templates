import { HttpApiClient } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'

export const ApiClient = HttpApiClient.make(Api, {
  baseUrl: 'http://localhost:5000'
})
