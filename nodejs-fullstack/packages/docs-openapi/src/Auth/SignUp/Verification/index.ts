import { HttpApiGroup } from '@effect/platform'
import VerifySignUpEmailEndpoint from './Verify/VerifySignUpEmailEndpoint'
import ResendVerificationApi from './ResendVerification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignUpEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
