import { HttpApiGroup } from '@effect/platform'
import ResendSignUpVerificationEmailEndpoint from '@api-docs/Auth/SignUp/Verification/ResendVerification/ResendSignUpVerificationEmailEndpoint'

const ResendVerificationApi = HttpApiGroup.make('ResendVerification').add(
  ResendSignUpVerificationEmailEndpoint
)

export default ResendVerificationApi
