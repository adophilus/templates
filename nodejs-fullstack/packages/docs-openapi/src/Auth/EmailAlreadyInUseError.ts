import { Schema } from 'effect'

class EmailAlreadyInUseError extends Schema.TaggedError<EmailAlreadyInUseError>()(
  'ERR_EMAIL_ALREADY_IN_USE',
  {}
) {}

export default EmailAlreadyInUseError