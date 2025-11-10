import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './Auth/GetProfileEndpoint'

const AuthApi = HttpApiGroup.make('Auth').add(GetProfileEndpoint)

export default AuthApi
