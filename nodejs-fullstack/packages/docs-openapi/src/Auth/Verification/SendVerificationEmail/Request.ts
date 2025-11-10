import { Schema } from 'effect'
import Email from '@api-docs/common/Email'

const Request = Schema.Struct({
  email: Email
}).annotations({
  description: 'Send verification email request body'
})

export default Request
