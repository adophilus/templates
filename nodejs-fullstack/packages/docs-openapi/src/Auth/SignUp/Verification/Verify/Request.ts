import { Schema } from 'effect'
import Email from '../../../../common/Email'
import Otp from '../../../../common/Otp'

const Request = Schema.Struct({
  email: Email,
  otp: Otp
}).annotations({
  description: 'Verify email request body'
})

export default Request
