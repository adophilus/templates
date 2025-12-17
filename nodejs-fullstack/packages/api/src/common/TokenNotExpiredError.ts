import { Schema } from 'effect'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class TokenNotExpiredError extends Schema.TaggedError<TokenNotExpiredError>()(
  'TokenNotExpiredError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.BAD_REQUEST }) // Added status annotation
) {}

export default TokenNotExpiredError
