import { HttpApiEndpoint } from '@effect/platform'
import { Schema } from 'effect'
import User from '../common/User'
import UnexpectedError from '../common/UnexpectedError'
import UnauthorizedError from '../common/UnauthorizedError'
import { StatusCodes } from 'http-status-codes'

const Success = Schema.Struct({
  code: Schema.Literal('USER_PROFILE'),
  data: User
})

const GetProfileEndpoint = HttpApiEndpoint.get('getProfile', '/auth/profile')
  .addSuccess(Success)
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })

export default GetProfileEndpoint
