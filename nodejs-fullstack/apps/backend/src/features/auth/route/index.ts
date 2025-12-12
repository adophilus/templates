import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/api'
import { SignUpEndpointLive } from './SignUpEndpoint'
import { SendVerificationEmailEndpointLive } from './SendSignInEmailEndpoint'
import { VerificationEndpointLive } from './VerificationEndpoint'
import { ResendVerificationEmailEndpointLive } from './ResendVerificationEmailEndpoint'
import { GetProfileEndpointLive } from './GetProfileEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('sendVerificationEmail', SignUpEndpointLive)
    .handle('sendVerificationEmail', SendVerificationEmailEndpointLive)
    .handle('resendVerificationEmail', ResendVerificationEmailEndpointLive)
    .handle('verify', VerificationEndpointLive)
    .handle('getProfile', GetProfileEndpointLive)
)

export default AuthApiLive
