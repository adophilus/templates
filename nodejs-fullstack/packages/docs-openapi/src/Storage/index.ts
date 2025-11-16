import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from './UploadMediaEndpoint'
import GetFileEndpoint from './GetFileEndpoint'
import DeleteFileEndpoint from './DeleteFileEndpoint'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(GetFileEndpoint)
  .add(DeleteFileEndpoint)

export default StorageApi
