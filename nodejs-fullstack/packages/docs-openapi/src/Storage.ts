import { HttpApiGroup } from '@effect/platform'
import UploadMediaEndpoint from '@/Storage/Upload/UploadMediaEndpoint'
import ByIdApi from '@/Storage/ById'

const StorageApi = HttpApiGroup.make('Storage')
  .add(UploadMediaEndpoint)
  .add(ByIdApi as any)

export default StorageApi
