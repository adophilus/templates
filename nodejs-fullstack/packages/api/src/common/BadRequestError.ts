import { HttpApiSchema } from '@effect/platform'
import { Schema } from 'effect'
import { StatusCodes } from 'http-status-codes'

class BadRequestError extends Schema.TaggedError<BadRequestError>()(
  'BadRequestError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.BAD_REQUEST })
) {}

export default BadRequestError
