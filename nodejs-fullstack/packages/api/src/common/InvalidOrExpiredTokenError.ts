import { Schema } from 'effect'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class InvalidOrExpiredTokenError extends Schema.TaggedError<InvalidOrExpiredTokenError>()(
  'InvalidOrExpiredTokenError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.BAD_REQUEST }) // Added status annotation
) {}

export default InvalidOrExpiredTokenError
