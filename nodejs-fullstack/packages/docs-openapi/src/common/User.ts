import { Schema } from 'effect'
import FullName from '@/common/FullName'
import Email from '@/common/Email'
import Timestamp from '@/common/Timestamp'
import Id from '@/common/Id'
import PhoneNumber from '@/common/PhoneNumber'

const User = Schema.Struct({
  id: Id,
  full_name: FullName,
  email: Email,
  phone_number: PhoneNumber,
  created_at: Timestamp,
  updated_at: Schema.NullOr(Timestamp)
})

export default User
