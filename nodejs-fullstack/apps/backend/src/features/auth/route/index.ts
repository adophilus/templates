import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { SendSignUpEmailEndpointLive } from './SendSignUpEmailEndpointLive'
import { SendSignInEmailEndpointLive } from './SendSignInEmailEndpoint'
import { VerifyEmailEndpointLive } from './VerifyEmailEndpoint'
import { ResendVerificationEmailEndpointLive } from './ResendVerificationEmailEndpoint'
import { GetProfileEndpointLive } from './GetProfileEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('sendSignUpEmail', SendSignUpEmailEndpointLive)
    .handle('sendSignInEmail', SendSignInEmailEndpointLive)
    .handle('resendVerificationEmail', ResendVerificationEmailEndpointLive)
    .handle('verifyEmail', VerifyEmailEndpointLive)
    .handle('getProfile', GetProfileEndpointLive)
)

export default AuthApiLive
