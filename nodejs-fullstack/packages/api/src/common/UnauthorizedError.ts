import { HttpApiSchema } from '@effect/platform'
import { Schema } from 'effect'
import { StatusCodes } from 'http-status-codes'

class UnauthorizedError extends Schema.TaggedError<UnauthorizedError>()(
  'UnauthorizedError',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.UNAUTHORIZED })
) {}

export default UnauthorizedError
