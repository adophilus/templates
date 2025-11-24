import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import { SignUpEndpointLive } from './SignUpEndpoint'

const AuthApiLive = HttpApiBuilder.group(Api, 'Auth', (handlers) =>
  handlers.handle('signUp', SignUpEndpointLive)
)

export default AuthApiLive
