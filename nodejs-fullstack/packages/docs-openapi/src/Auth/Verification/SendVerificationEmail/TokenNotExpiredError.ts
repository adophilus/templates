import { Schema } from 'effect'

class TokenNotExpiredError extends Schema.TaggedError<TokenNotExpiredError>()(
  'ERR_TOKEN_NOT_EXPIRED',
  {}
) {}

export default TokenNotExpiredError
