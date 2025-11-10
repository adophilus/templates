import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './Auth/GetProfileEndpoint'
import SignUpApi from './Auth/SignUp'
import SignInApi from './Auth/SignIn'

const AuthApi = HttpApiGroup.make('Auth')
  .add(GetProfileEndpoint)
  .add(SignUpApi)
  .add(SignInApi)

export default AuthApi
