import { HttpApiGroup } from '@effect/platform'
import VerifySignInEmailEndpoint from './Verify/VerifySignInEmailEndpoint'
import ResendVerificationApi from './ResendVerification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignInEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
