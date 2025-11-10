import UnauthorizedError from '@api-docs/common/UnauthorizedError'
import { HttpApiMiddleware, HttpApiSecurity } from '@effect/platform'

class Authorization extends HttpApiMiddleware.Tag<Authorization>()(
  'Authorization',
  {
    failure: UnauthorizedError,
    // Specify the resource this middleware will provide
    // provides: CurrentUser,
    security: {
      bearerAuth: HttpApiSecurity.bearer
    }
  }
) {}

export default Authorization
