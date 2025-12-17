import { HttpApiSchema } from '@effect/platform'
import { Schema } from 'effect'
import { StatusCodes } from 'http-status-codes'

class UnexpectedError extends Schema.TaggedError<UnexpectedError>()(
  'UnexpectedError',
  {
    message: Schema.optional(Schema.String)
  },
  HttpApiSchema.annotations({ status: StatusCodes.UNAUTHORIZED })
) {}

export default UnexpectedError
