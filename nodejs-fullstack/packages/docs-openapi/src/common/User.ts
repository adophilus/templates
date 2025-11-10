import { Schema } from 'effect'
import FullName from './FullName'
import Email from './Email'
import Timestamp from './Timestamp'
import Id from './Id'
import PhoneNumber from './PhoneNumber'

const User = Schema.Struct({
  id: Id,
  full_name: FullName,
  email: Email,
  phone_number: PhoneNumber,
  created_at: Timestamp,
  updated_at: Schema.NullOr(Timestamp)
})

export default User
