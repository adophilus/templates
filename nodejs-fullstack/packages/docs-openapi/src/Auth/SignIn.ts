import { HttpApiGroup } from '@effect/platform'
import SendSignInEmailEndpoint from '@api-docs/Auth/SignIn/SignIn/SendSignInEmailEndpoint'
import VerificationApi from '@api-docs/Auth/SignIn/Verification'

const SignInApi = HttpApiGroup.make('SignIn')
  .add(SendSignInEmailEndpoint)
  .add(VerificationApi)

export default SignInApi
