import { HttpApiGroup } from '@effect/platform'
import SendSignInEmailEndpoint from './SignIn/SignIn/SendSignInEmailEndpoint'
import VerificationApi from './SignIn/Verification'

const SignInApi = HttpApiGroup.make('SignIn')
  .add(SendSignInEmailEndpoint)
  .add(VerificationApi as any)

export default SignInApi
