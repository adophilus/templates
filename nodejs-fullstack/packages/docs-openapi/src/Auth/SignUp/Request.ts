import { Schema } from 'effect'
import User from '@api-docs/common/User'
import ReferralCode from '@api-docs/common/ReferralCode'
import Email from '@api-docs/common/Email'
import FullName from '@api-docs/common/FullName'
import PhoneNumber from '@api-docs/common/PhoneNumber'

const Request = Schema.Struct({
  full_name: FullName,
  email: Email,
  phone_number: PhoneNumber,
  referral_code: Schema.optional(ReferralCode)
}).annotations({
  description: 'Sign up request body'
})

export default Request
