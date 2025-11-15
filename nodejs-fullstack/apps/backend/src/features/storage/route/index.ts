import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { uploadMediaEndpointLive } from './UploadMediaEndpoint'

const storageApiLive = HttpApiBuilder.group(Api, 'Storage', (handlers) =>
  handlers.handle('uploadMedia', uploadMediaEndpointLive)
)

export default storageApiLive
