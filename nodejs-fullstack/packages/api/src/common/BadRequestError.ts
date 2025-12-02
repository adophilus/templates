import { Schema } from 'effect'

class BadRequestError extends Schema.TaggedError<BadRequestError>()(
  'BadRequestError',
  {}
) {}

export default BadRequestError
