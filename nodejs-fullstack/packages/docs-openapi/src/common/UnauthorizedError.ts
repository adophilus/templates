import { Schema } from 'effect'

class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
  'ERR_UNAUTHORIZED',
  {}
) {}

export default UnauthorizedError
