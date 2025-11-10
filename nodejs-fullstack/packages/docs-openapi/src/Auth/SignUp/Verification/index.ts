import { HttpApiGroup } from '@effect/platform'
import VerifySignUpEmailEndpoint from '@api-docs/Auth/SignUp/Verification/Verify/VerifySignUpEmailEndpoint'
import ResendVerificationApi from '@api-docs/Auth/SignUp/Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignUpEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
