import { HttpApiGroup } from '@effect/platform'
import ResendSignInVerificationEmailEndpoint from '@api-docs/Auth/SignIn/Verification/ResendVerification/ResendSignInVerificationEmailEndpoint'

const ResendVerificationApi = HttpApiGroup.make('ResendVerification').add(
  ResendSignInVerificationEmailEndpoint
)

export default ResendVerificationApi
