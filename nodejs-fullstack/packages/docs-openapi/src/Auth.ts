import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from '@api-docs/Auth/GetProfileEndpoint'
import SignUpApi from '@api-docs/Auth/SignUp'
import SignInApi from '@api-docs/Auth/SignIn'

const AuthApi = HttpApiGroup.make('Auth')
  .add(GetProfileEndpoint)
  .add(SignUpApi)
  .add(SignInApi)

export default AuthApi
