import { Schema } from 'effect'

class EmailAlreadyInUseError extends Schema.TaggedError<EmailAlreadyInUseError>()(
  'EmailAlreadyInUseError',
  {}
) {}

export default EmailAlreadyInUseError