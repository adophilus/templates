import { HttpApiGroup } from '@effect/platform'
import VerifySignUpEmailEndpoint from './Verification/Verify/VerifySignUpEmailEndpoint'
import ResendVerificationApi from './Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignUpEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
