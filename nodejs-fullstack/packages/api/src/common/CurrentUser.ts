import { Context } from 'effect'
import type User from './User'

class CurrentUser extends Context.Tag('CurrentUser')<CurrentUser, User>() {}

export default CurrentUser
