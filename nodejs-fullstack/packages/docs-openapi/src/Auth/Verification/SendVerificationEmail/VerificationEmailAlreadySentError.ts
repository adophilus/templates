import { Schema } from 'effect'
import Timestamp from '@api-docs/common/Timestamp'

class VerificationEmailAlreadySentError extends Schema.TaggedError<
  VerificationEmailAlreadySentError
>()('ERR_VERIFICATION_EMAIL_ALREADY_SENT', {
  data: Schema.Struct({
    expires_at: Timestamp
  })
})

export default VerificationEmailAlreadySentError
