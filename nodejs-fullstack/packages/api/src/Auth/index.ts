import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './GetProfileEndpoint'
import SendSignInEmailEndpoint from './SendSignInEmailEndpoint'
import SendSignUpEmailEndpoint from './SignUpEndpoint'
import VerifySignInEmailEndpoint from './VerifySignInEmailEndpoint'
import ResendSignInVerificationEmailEndpoint from './ResendSignInVerificationEmailEndpoint'
import VerifySignUpEmailEndpoint from './VerifySignUpEmailEndpoint'
import ResendSignUpVerificationEmailEndpoint from './ResendSignUpVerificationEmailEndpoint'

const AuthApi = HttpApiGroup.make('Auth')
  .add(SendSignUpEmailEndpoint)
  .add(ResendSignUpVerificationEmailEndpoint)
  .add(VerifySignUpEmailEndpoint)
  .add(SendSignInEmailEndpoint)
  .add(ResendSignInVerificationEmailEndpoint)
  .add(VerifySignInEmailEndpoint)
  .add(GetProfileEndpoint)

export default AuthApi
