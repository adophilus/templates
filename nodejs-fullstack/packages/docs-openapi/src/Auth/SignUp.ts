import { HttpApiGroup } from '@effect/platform'
import SignUpEndpoint from '@api-docs/Auth/SignUp/SignUpEndpoint'
import VerificationApi from '@api-docs/Auth/SignUp/Verification'

const SignUpApi = HttpApiGroup.make('SignUp')
  .add(SignUpEndpoint)
  .add(VerificationApi as any)

export default SignUpApi
