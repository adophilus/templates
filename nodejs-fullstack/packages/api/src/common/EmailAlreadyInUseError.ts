import { Schema } from 'effect'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class EmailAlreadyInUseError extends Schema.TaggedError<EmailAlreadyInUseError>()(
  'EmailAlreadyInUseError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.CONFLICT }) // Added status annotation
) {}

export default EmailAlreadyInUseError
