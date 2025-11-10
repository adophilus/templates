import { Schema } from 'effect'
import Email from '../../../../common/Email'

const Request = Schema.Struct({
  email: Email
}).annotations({
  description: 'Send verification email request body'
})

export default Request
