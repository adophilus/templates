import { HttpApiGroup } from '@effect/platform'
import VerifySignInEmailEndpoint from '@/Auth/SignIn/Verification/Verify/VerifySignInEmailEndpoint'
import ResendVerificationApi from '@/Auth/SignIn/Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignInEmailEndpoint)
  .add(ResendVerificationApi as any)

export default VerificationApi
