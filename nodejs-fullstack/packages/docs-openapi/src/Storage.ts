import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './Storage/Upload/UploadMediaEndpoint'
import ByIdApi from './Storage/ById'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(ByIdApi)

export default StorageApi
