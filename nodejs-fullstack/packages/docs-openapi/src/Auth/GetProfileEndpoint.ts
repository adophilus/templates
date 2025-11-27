import { HttpApiEndpoint } from '@effect/platform'
import { Schema } from 'effect'
import User from '../common/User'
import UnexpectedError from '../common/UnexpectedError'
import UnauthorizedError from '../common/UnauthorizedError'
import { StatusCodes } from 'http-status-codes'
import AuthenticationMiddleware from './AuthenticationMiddleware'

export class GetProfileSuccessResponse extends Schema.TaggedClass<GetProfileSuccessResponse>()(
  'GetProfileResponse',
  {
    data: User
  }
) {}

const GetProfileEndpoint = HttpApiEndpoint.get('getProfile', '/auth/profile')
  .middleware(AuthenticationMiddleware)
  .addSuccess(GetProfileSuccessResponse)
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })

export default GetProfileEndpoint
