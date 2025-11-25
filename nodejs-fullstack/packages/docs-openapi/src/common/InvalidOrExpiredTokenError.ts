import { Schema } from 'effect'

class InvalidOrExpiredTokenError extends Schema.TaggedError<InvalidOrExpiredTokenError>()(
  'ERR_INVALID_OR_EXPIRED_TOKEN',
  {}
) {}

export default InvalidOrExpiredTokenError