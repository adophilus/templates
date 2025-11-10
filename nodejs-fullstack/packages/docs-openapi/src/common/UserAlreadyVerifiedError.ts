import { Schema } from 'effect'

class UserAlreadyVerifiedError extends Schema.TaggedError<UserAlreadyVerifiedError>()(
  'ERR_USER_ALREADY_VERIFIED',
  {}
) {}

export default UserAlreadyVerifiedError