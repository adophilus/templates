import { HttpApiEndpoint } from '@effect/platform'
import { Schema } from 'effect'
import User from '../common/User'
import UnexpectedError from '../common/UnexpectedError'
import UnauthorizedError from '../common/UnauthorizedError'
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
  .addError(UnauthorizedError)
  .addError(UnexpectedError)

export default GetProfileEndpoint
