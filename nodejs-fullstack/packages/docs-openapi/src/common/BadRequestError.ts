import { Schema } from 'effect'

class BadRequestError extends Schema.TaggedError<BadRequestError>()(
  'ERR_EXPECTED_DATA_NOT_RECEIVED',
  {}
) {}

export default BadRequestError
