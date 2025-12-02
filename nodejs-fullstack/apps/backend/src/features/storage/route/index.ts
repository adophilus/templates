import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { UploadMediaEndpointLive } from './UploadMediaEndpoint'
import { DeleteMediaEndpointLive } from './DeleteMediaEndpoint'
import { GetMediaEndpointLive } from './GetMediaEndpoint'

const StorageApiLive = HttpApiBuilder.group(Api, 'Storage', (handlers) =>
  handlers
    .handle('uploadMedia', UploadMediaEndpointLive)
    .handle('getMedia', GetMediaEndpointLive)
    .handle('deleteMedia', DeleteMediaEndpointLive)
)

export default StorageApiLive
