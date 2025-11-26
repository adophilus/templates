import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpEndpointLive } from './SignUpEndpoint'
import { VerifySignUpEmailEndpointLive } from './VerifySignUpEmailEndpoint'
import { SendSignInEmailEndpointLive } from './SendSignInEmailEndpoint'
import { VerifySignInEmailEndpointLive } from './VerifySignInEmailEndpoint'
import { ResendSignInVerificationEmailEndpointLive } from './ResendSignInVerificationEmailEndpoint'
import { ResendSignUpVerificationEmailEndpointLive } from './ResendSignUpVerificationEmailEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('signUp', SignUpEndpointLive)
    .handle('verifySignUpEmail', VerifySignUpEmailEndpointLive)
    .handle('sendSignInEmail', SendSignInEmailEndpointLive)
    .handle('verifySignInEmail', VerifySignInEmailEndpointLive)
    .handle('resendSignInVerificationEmail', ResendSignInVerificationEmailEndpointLive)
    .handle('resendSignUpVerificationEmail', ResendSignUpVerificationEmailEndpointLive)
)

export default AuthApiLive
