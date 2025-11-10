import { HttpApiGroup } from '@effect/platform'
import ResendSignInVerificationEmailEndpoint from './ResendVerification/ResendSignInVerificationEmailEndpoint'

const ResendVerificationApi = HttpApiGroup.make('ResendVerification').add(
  ResendSignInVerificationEmailEndpoint
)

export default ResendVerificationApi
