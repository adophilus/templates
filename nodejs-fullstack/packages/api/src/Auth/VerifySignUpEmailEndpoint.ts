import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import InvalidOrExpiredTokenError from '../common/InvalidOrExpiredTokenError'
import UnexpectedError from '../common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '../common/Email'
import Otp from '../common/Otp'
import Jwt from '../common/Jwt'

const Request = Schema.Struct({
  email: Email,
  otp: Otp
}).annotations({
  description: 'Verify email request body'
})

export class VerifySignUpEmailSuccessResponse extends Schema.TaggedClass<VerifySignUpEmailSuccessResponse>()(
  'VerifySignUpEmailResponse',
  {
    data: Schema.Struct({
      access_token: Jwt
      // Note: refresh tokens have been phased out in favor of server-side sessions
    })
  }
) {}

const VerifySignUpEmailEndpoint = HttpApiEndpoint.post(
  'verifySignUpEmail',
  '/auth/sign-up/verification'
)
  .setPayload(Request)
  .addSuccess(VerifySignUpEmailSuccessResponse, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Verify email')

export default VerifySignUpEmailEndpoint
