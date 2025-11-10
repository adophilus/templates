import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './UploadMediaEndpoint'
import GetFileEndpoint from './GetFileEndpoint'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(GetFileEndpoint)

export default StorageApi
