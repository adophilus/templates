import { HttpApiGroup } from '@effect/platform'
import SignUpEndpoint from './SignUp/SignUpEndpoint'
import VerificationApi from './Verification/index.ts'

const SignUpApi = HttpApiGroup.make('SignUp')
  .add(SignUpEndpoint)
  .add(VerificationApi)

export default SignUpApi
