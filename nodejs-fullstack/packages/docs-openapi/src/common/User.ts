import { Schema } from 'effect'
import FullName from '@api-docs/common/FullName'
import Email from '@api-docs/common/Email'
import Timestamp from '@api-docs/common/Timestamp'
import Id from '@api-docs/common/Id'
import PhoneNumber from '@api-docs/common/PhoneNumber'

const User = Schema.Struct({
  id: Id,
  full_name: FullName,
  email: Email,
  phone_number: PhoneNumber,
  created_at: Timestamp,
  updated_at: Schema.NullOr(Timestamp)
})

export default User
