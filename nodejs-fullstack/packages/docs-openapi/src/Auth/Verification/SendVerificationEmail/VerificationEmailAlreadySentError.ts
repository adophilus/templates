import { Schema } from 'effect'
import Timestamp from '@api-docs/common/Timestamp'

import { Schema } from 'effect'

class VerificationEmailAlreadySentError extends Schema.TaggedError(
  'ERR_VERIFICATION_EMAIL_ALREADY_SENT'
) {}

export default VerificationEmailAlreadySentError

