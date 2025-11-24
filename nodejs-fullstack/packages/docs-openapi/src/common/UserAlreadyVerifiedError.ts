import { Schema } from 'effect'

class UserAlreadyVerifiedError extends Schema.TaggedError<UserAlreadyVerifiedError>()(
  'UserAlreadyVerifiedError',
  {}
) {}

export default UserAlreadyVerifiedError