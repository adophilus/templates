import { Schema } from 'effect'

class BadRequestError extends Schema.TaggedError<BadRequestError>()(
  'ERR_EXPECTED_DATA_NOT_RECEIVED',
  {
    data: Schema.Struct({
      formErrors: Schema.Array(Schema.String),
      fieldErrors: Schema.Unknown
    })
  }
) {}

export default BadRequestError
