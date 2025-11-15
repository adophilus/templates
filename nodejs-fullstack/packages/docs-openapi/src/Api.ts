import { HttpApi, OpenApi } from '@effect/platform'
import AuthApi from './Auth'
import StorageApi from './Storage'

const Api = HttpApi.make('API')
  .annotate(OpenApi.Title, 'API Documentation')
  .annotate(OpenApi.Description, 'API Documentation')
  .annotate(OpenApi.Version, '1.0.0')
  .annotate(OpenApi.Servers, [
    {
      url: 'http://localhost:5000',
      description: 'server'
    }
  ])
  // .add(AuthApi)
  .add(StorageApi)

export default Api
