import { Schema } from 'effect'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class UserNotFoundError extends Schema.TaggedError<UserNotFoundError>()(
  'UserNotFoundError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.NOT_FOUND }) // Added status annotation
) {}

export default UserNotFoundError
