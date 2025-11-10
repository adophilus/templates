import { HttpApiGroup } from '@effect/platform'
import SendSignInEmailEndpoint from './SignIn/SignIn/SendSignInEmailEndpoint'
import VerificationApi from './Verification/index.ts'

const SignInApi = HttpApiGroup.make('SignIn')
  .add(SendSignInEmailEndpoint)
  .add(VerificationApi)

export default SignInApi
