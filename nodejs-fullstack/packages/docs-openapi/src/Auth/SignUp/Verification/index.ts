import { HttpApiGroup } from '@effect/platform'
import VerifySignUpEmailEndpoint from '@/Auth/SignUp/Verification/Verify/VerifySignUpEmailEndpoint'
import ResendVerificationApi from '@/Auth/SignUp/Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignUpEmailEndpoint)
  .add(ResendVerificationApi as any)

export default VerificationApi
