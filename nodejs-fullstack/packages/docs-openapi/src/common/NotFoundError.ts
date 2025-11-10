import { Schema } from 'effect'

class NotFoundError<T extends string> extends Schema.TaggedError<
  NotFoundError<T>
>()(`ERR_${Schema.String.pipe(Schema.Literal(Schema.String))}_NOT_FOUND`, {}) {}

export default NotFoundError
