import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './Upload/UploadMediaEndpoint'
import ByIdApi from './ById'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(ByIdApi)

export default StorageApi
