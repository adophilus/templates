import { HttpApiGroup } from '@effect/platform'
import VerifySignUpEmailEndpoint from './Verify/VerifySignUpEmailEndpoint'
import ResendVerificationApi from './ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignUpEmailEndpoint)
  .add(ResendVerificationApi as any)

export default VerificationApi
