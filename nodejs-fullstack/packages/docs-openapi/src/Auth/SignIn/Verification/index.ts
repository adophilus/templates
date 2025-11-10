import { HttpApiGroup } from '@effect/platform'
import VerifySignInEmailEndpoint from '@api-docs/Auth/SignIn/Verification/Verify/VerifySignInEmailEndpoint'
import ResendVerificationApi from '@api-docs/Auth/SignIn/Verification/ResendVerification'

const VerificationApi = HttpApiGroup.make('Verification')
  .add(VerifySignInEmailEndpoint)
  .add(ResendVerificationApi)

export default VerificationApi
