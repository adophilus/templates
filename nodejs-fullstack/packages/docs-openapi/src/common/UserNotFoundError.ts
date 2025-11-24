import { Schema } from 'effect'

class UserNotFoundError extends Schema.TaggedError<UserNotFoundError>()(
  'UserNotFoundError',
  {}
) {}

export default UserNotFoundError
