import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpEndpointLive } from './SignUpEndpoint'
import { VerifySignUpEmailEndpointLive } from './VerifySignUpEmailEndpoint'
import { SendSignInEmailEndpointLive } from './SendSignInEmailEndpoint'
import { VerifySignInEmailEndpointLive } from './VerifySignInEmailEndpoint'
import { ResendSignInVerificationEmailEndpointLive } from './ResendSignInVerificationEmailEndpoint'
import { ResendSignUpVerificationEmailEndpointLive } from './ResendSignUpVerificationEmailEndpoint'
import { GetProfileEndpointLive } from './GetProfileEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('sendSignUpEmail', SignUpEndpointLive)
    .handle('resendSignUpVerificationEmail', ResendSignUpVerificationEmailEndpointLive)
    .handle('verifySignUpEmail', VerifySignUpEmailEndpointLive)
    .handle('sendSignInEmail', SendSignInEmailEndpointLive)
    .handle('resendSignInVerificationEmail', ResendSignInVerificationEmailEndpointLive)
    .handle('verifySignInEmail', VerifySignInEmailEndpointLive)
    .handle('getProfile', GetProfileEndpointLive)
)

export default AuthApiLive
