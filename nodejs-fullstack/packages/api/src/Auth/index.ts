import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './GetProfileEndpoint'
import SendVerificationEmailEndpoint from './SendVerificationEmailEndpoint'
import SendSignUpEmailEndpoint from './SignUpEndpoint'
import VerificationEndpoint from './VerificationEndpoint'
import ResendVerificationEmailEndpoint from './ResendVerificationEmailEndpoint'

const AuthApi = HttpApiGroup.make('Auth')
  .add(SendSignUpEmailEndpoint)
  .add(SendVerificationEmailEndpoint)
  .add(ResendVerificationEmailEndpoint)
  .add(VerificationEndpoint)
  .add(GetProfileEndpoint)

export default AuthApi
