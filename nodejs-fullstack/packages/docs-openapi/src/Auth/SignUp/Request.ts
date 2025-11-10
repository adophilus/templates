import { Schema } from 'effect'
import User from '../../common/User'
import ReferralCode from '../../common/ReferralCode'
import Email from '../../common/Email'
import FullName from '../../common/FullName'
import PhoneNumber from '../../common/PhoneNumber'

const Request = Schema.Struct({
  full_name: FullName,
  email: Email,
  phone_number: PhoneNumber,
  referral_code: Schema.optional(ReferralCode)
}).annotations({
  description: 'Sign up request body'
})

export default Request
