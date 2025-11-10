import { Schema } from 'effect'
import Email from '@api-docs/common/Email'
import Otp from '@api-docs/common/Otp'

const Request = Schema.Struct({
  email: Email,
  otp: Otp
}).annotations({
  description: 'Verify email request body'
})

export default Request
