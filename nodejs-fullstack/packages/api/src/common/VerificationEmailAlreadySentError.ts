import { Schema } from 'effect'
import Timestamp from './Timestamp'
import { HttpApiSchema } from '@effect/platform' // Added import
import { StatusCodes } from 'http-status-codes' // Added import

class VerificationEmailAlreadySentError extends Schema.TaggedError<VerificationEmailAlreadySentError>()(
  'VerificationEmailAlreadySentError',
  {
    expires_at: Timestamp
  },
  HttpApiSchema.annotations({ status: StatusCodes.BAD_REQUEST }) // Added status annotation
) {}

export default VerificationEmailAlreadySentError
