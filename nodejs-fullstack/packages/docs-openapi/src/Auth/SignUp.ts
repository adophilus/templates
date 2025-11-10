import { HttpApiGroup } from '@effect/platform'
import SignUpEndpoint from './SignUp/SignUpEndpoint'
import VerificationApi from './SignUp/Verification'

const SignUpApi = HttpApiGroup.make('SignUp')
  .add(SignUpEndpoint)
  .add(VerificationApi as any)

export default SignUpApi
