import { HttpApiMiddleware, HttpApiSecurity, OpenApi } from '@effect/platform'
import { CurrentUser, UnauthorizedError, UnexpectedError } from '../common'
import { Schema } from 'effect'

class AuthenticationMiddleware extends HttpApiMiddleware.Tag<AuthenticationMiddleware>()(
  'AuthenticationMiddleware',
  {
    provides: CurrentUser,
    failure: Schema.Union(UnauthorizedError, UnexpectedError),
    security: {
      token: HttpApiSecurity.bearer.pipe(
        HttpApiSecurity.annotate(OpenApi.Description, 'bearer token')
      )
    }
  }
) {}

export default AuthenticationMiddleware
