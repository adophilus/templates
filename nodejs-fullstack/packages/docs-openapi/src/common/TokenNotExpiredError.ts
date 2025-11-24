import { Schema } from 'effect'

class TokenNotExpiredError extends Schema.TaggedError<TokenNotExpiredError>()(
  'TokenNotExpiredError',
  {}
) {}

export default TokenNotExpiredError