import { Schema } from 'effect'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class UserAlreadyVerifiedError extends Schema.TaggedError<UserAlreadyVerifiedError>()(
  'UserAlreadyVerifiedError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.BAD_REQUEST }) // Added status annotation
) {}

export default UserAlreadyVerifiedError
