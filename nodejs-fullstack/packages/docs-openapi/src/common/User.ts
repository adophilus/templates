import { Schema } from 'effect'
import FullName from './FullName'
import Email from './Email'
import Timestamp from './Timestamp'
import Id from './Id'

class User extends Schema.Class<User>('User')({
  id: Id,
  full_name: FullName,
  email: Email,
  created_at: Timestamp,
  updated_at: Schema.NullOr(Timestamp)
}) {}

export default User
