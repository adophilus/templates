import { HttpApiGroup } from '@effect/platform'
import SendSignInEmailEndpoint from '@/Auth/SignIn/SignIn/SendSignInEmailEndpoint'
import VerificationApi from '@/Auth/SignIn/Verification'

const SignInApi = HttpApiGroup.make('SignIn')
  .add(SendSignInEmailEndpoint)
  .add(VerificationApi as any)

export default SignInApi
