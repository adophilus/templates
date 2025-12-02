import { Schema } from 'effect'

class InvalidOrExpiredTokenError extends Schema.TaggedError<InvalidOrExpiredTokenError>()(
  'InvalidOrExpiredTokenError',
  {}
) {}

export default InvalidOrExpiredTokenError
