import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './GetProfileEndpoint'
import SendSignInEmailEndpoint from './SendSignInEmailEndpoint'
import SignUpEndpoint from './SignUpEndpoint'
import VerifySignInEmailEndpoint from './VerifySignInEmailEndpoint'
import ResendSignInVerificationEmailEndpoint from './ResendSignInVerificationEmailEndpoint'
import VerifySignUpEmailEndpoint from './VerifySignUpEmailEndpoint'
import ResendSignUpVerificationEmailEndpoint from './ResendSignUpVerificationEmailEndpoint'

const AuthApi = HttpApiGroup.make('Auth')
  .add(GetProfileEndpoint)
  .add(SendSignInEmailEndpoint)
  .add(SignUpEndpoint)
  .add(VerifySignInEmailEndpoint)
  .add(ResendSignInVerificationEmailEndpoint)
  .add(VerifySignUpEmailEndpoint)
  .add(ResendSignUpVerificationEmailEndpoint)

export default AuthApi