import { HttpApiGroup } from '@effect/platform'
import GetFileEndpoint from '@api-docs/Storage/ById/Get/GetFileEndpoint'

const ByIdApi = HttpApiGroup.make('ById').add(GetFileEndpoint)

export default ByIdApi
