import { Schema } from 'effect'

class UnexpectedError extends Schema.TaggedError<UnexpectedError>()(
  'ERR_UNEXPECTED',
  {}
) {}

export default UnexpectedError
