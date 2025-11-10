import { HttpApiGroup } from '@effect/platform'
import ResendSignUpVerificationEmailEndpoint from './ResendVerification/ResendSignUpVerificationEmailEndpoint'

const ResendVerificationApi = HttpApiGroup.make('ResendVerification').add(
  ResendSignUpVerificationEmailEndpoint
)

export default ResendVerificationApi
