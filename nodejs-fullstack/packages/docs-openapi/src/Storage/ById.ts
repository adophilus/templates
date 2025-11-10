import { HttpApiGroup } from '@effect/platform'
import GetFileEndpoint from './ById/Get/GetFileEndpoint'

const ByIdApi = HttpApiGroup.make('ById').add(GetFileEndpoint)

export default ByIdApi
