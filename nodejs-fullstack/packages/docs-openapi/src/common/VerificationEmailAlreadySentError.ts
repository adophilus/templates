import { Schema } from 'effect'
import Timestamp from './Timestamp'

class VerificationEmailAlreadySentError extends Schema.TaggedError<VerificationEmailAlreadySentError>()(
  'VerificationEmailAlreadySentError',
  {
    expires_at: Timestamp
  }
) {}

export default VerificationEmailAlreadySentError
