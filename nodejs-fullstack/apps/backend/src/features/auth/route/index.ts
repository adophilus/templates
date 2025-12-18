import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { SendSignUpEmailEndpointLive } from './SendSignUpEmailEndpoint'
import { ResendVerificationEmailEndpointLive } from './ResendVerificationEmailEndpoint'
import { GetProfileEndpointLive } from './GetProfileEndpoint'
import { SendSignInEmailEndpointLive } from './SendSignInEmailEnddoint'
import { VerifyEmailEndpointLive } from './VerifyEmailEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('sendSignUpEmail', SendSignUpEmailEndpointLive)
    .handle('sendSignInEmail', SendSignInEmailEndpointLive)
    .handle('resendVerificationEmail', ResendVerificationEmailEndpointLive)
    .handle('verifyEmail', VerifyEmailEndpointLive)
    .handle('getProfile', GetProfileEndpointLive)
)

export default AuthApiLive
