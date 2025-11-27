import { HttpApiMiddleware, HttpApiSecurity } from '@effect/platform'
import { CurrentUser } from '../common'
import { Unauthorized } from '@effect/platform/HttpApiError'

class AuthenticationMiddleware extends HttpApiMiddleware.Tag<AuthenticationMiddleware>()(
  'AuthenticationMiddleware',
  {
    provides: CurrentUser,
    failure: Unauthorized,
    security: {
      token: HttpApiSecurity.bearer
    }
  }
) {}

export default AuthenticationMiddleware
