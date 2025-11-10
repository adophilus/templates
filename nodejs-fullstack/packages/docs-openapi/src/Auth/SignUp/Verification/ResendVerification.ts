import { HttpApiGroup } from '@effect/platform'
import ResendSignUpVerificationEmailEndpoint from '@/Auth/SignUp/Verification/ResendVerification/ResendSignUpVerificationEmailEndpoint'

const ResendVerificationApi = HttpApiGroup.make('ResendVerification').add(
  ResendSignUpVerificationEmailEndpoint
)

export default ResendVerificationApi
