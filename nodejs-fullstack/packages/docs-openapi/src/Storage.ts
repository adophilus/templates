import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from '@api-docs/Storage/Upload/UploadMediaEndpoint'
import ByIdApi from '@api-docs/Storage/ById'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(ByIdApi as any)

export default StorageApi
