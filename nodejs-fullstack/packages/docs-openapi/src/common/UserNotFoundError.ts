import { Schema } from 'effect'

class UserNotFoundError extends Schema.TaggedError<UserNotFoundError>()(
  'ERR_USER_NOT_FOUND',
  {}
) {}

export default UserNotFoundError
