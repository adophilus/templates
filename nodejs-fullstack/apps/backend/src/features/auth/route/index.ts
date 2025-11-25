import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpEndpointLive } from './SignUpEndpoint'
import { VerifySignUpEmailEndpointLive } from './VerifySignUpEmailEndpoint'
import { SendSignInEmailEndpointLive } from './SendSignInEmailEndpoint'
import { VerifySignInEmailEndpointLive } from './VerifySignInEmailEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers
    .handle('signUp', SignUpEndpointLive)
    .handle('verifySignUpEmail', VerifySignUpEmailEndpointLive)
    .handle('sendSignInEmail', SendSignInEmailEndpointLive)
    .handle('verifySignInEmail', VerifySignInEmailEndpointLive)
)

export default AuthApiLive
