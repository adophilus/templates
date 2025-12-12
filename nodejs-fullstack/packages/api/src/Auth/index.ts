import { HttpApiGroup } from '@effect/platform'
import GetProfileEndpoint from './GetProfileEndpoint'
import SendSignInEmailEndpoint from './SendSignInEmailEndpoint'
import SendSignUpEmailEndpoint from './SendSignUpEmailEndpoint'
import ResendVerificationEmailEndpoint from './ResendVerificationEmailEndpoint'
import VerifyEmailEndpoint from './VerifyEmailEndpoint'

const AuthApi = HttpApiGroup.make('Auth')
  .add(SendSignUpEmailEndpoint)
  .add(SendSignInEmailEndpoint)
  .add(ResendVerificationEmailEndpoint)
  .add(VerifyEmailEndpoint)
  .add(GetProfileEndpoint)

export default AuthApi
