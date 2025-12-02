import { Schema } from 'effect'

class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
  'UnauthorizedError',
  {}
) {}

export default UnauthorizedError
