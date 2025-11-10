import { HttpApiGroup } from '@effect/platform'
import VerifySignInEmailEndpoint from './Verification/Verify/VerifySignInEmailEndpoint'
import ResendVerificationApi from './Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignInEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
