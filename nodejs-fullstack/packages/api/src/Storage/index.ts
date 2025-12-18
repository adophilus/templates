import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './UploadMediaEndpoint'
import GetMediaEndpoint from './GetMediaEndpoint'
import DeleteMediaEndpoint from './DeleteMediaEndpoint'
import { ListMediaEndpoint } from './ListMediaEndpoint'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(GetMediaEndpoint)
  .add(ListMediaEndpoint)
  .add(DeleteMediaEndpoint)

export default StorageApi
