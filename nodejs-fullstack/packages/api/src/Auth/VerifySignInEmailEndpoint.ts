import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import InvalidOrExpiredTokenError from '../common/InvalidOrExpiredTokenError'
import UnexpectedError from '../common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '../common/Email'
import Otp from '../common/Otp'
import SessionToken from '../common/SessionToken'

const Request = Schema.Struct({
  email: Email,
  otp: Otp
}).annotations({
  description: 'Verify email request body'
})

export class VerifySignInEmailSuccessResponse extends Schema.TaggedClass<VerifySignInEmailSuccessResponse>()(
  'VerifySignInEmailResponse',
  {
    data: Schema.Struct({
      access_token: SessionToken
    })
  }
) {}

const VerifySignInEmailEndpoint = HttpApiEndpoint.post(
  'verifySignInEmail',
  '/auth/sign-in/verification'
)
  .setPayload(Request)
  .addSuccess(VerifySignInEmailSuccessResponse, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Verify email')

export default VerifySignInEmailEndpoint
