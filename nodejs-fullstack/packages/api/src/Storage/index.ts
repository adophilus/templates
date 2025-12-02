import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './UploadMediaEndpoint'
import GetMediaEndpoint from './GetMediaEndpoint'
import DeleteMediaEndpoint from './DeleteMediaEndpoint'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(GetMediaEndpoint)
  .add(DeleteMediaEndpoint)

export default StorageApi
