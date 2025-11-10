import { HttpApiGroup } from '@effect/platform'
import VerifySignInEmailEndpoint from './Verify/VerifySignInEmailEndpoint'
import ResendVerificationApi from './ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignInEmailEndpoint)
  .add(ResendVerificationApi as any)

export default VerificationApi
