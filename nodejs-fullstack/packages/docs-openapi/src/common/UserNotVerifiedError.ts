import { Schema } from 'effect'

export class UserNotVerifiedError extends Schema.TaggedClass<UserNotVerifiedError>()(
  'UserNotVerifiedError',
  {}
) {}

export default UserNotVerifiedError