import { HttpApiGroup } from '@effect/platform'
import SignUpEndpoint from '@/Auth/SignUp/SignUpEndpoint'
import VerificationApi from '@/Auth/SignUp/Verification'

const SignUpApi = HttpApiGroup.make('SignUp')
  .add(SignUpEndpoint)
  .add(VerificationApi as any)

export default SignUpApi
