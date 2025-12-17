import { HttpApiEndpoint, HttpApiSchema } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import InvalidOrExpiredTokenError from '../common/InvalidOrExpiredTokenError'
import UnexpectedError from '../common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '../common/Email'
import Otp from '../common/Otp'
import SessionToken from '../common/SessionToken'

export class VerifyEmailRequestBody extends Schema.Class<VerifyEmailRequestBody>(
  'VerifyEmailRequestBody'
)(
  {
    email: Email,
    otp: Otp
  },
  {
    description: 'Verify sign in email request body'
  }
) {}

export class VerifyEmailSuccessResponse extends Schema.TaggedClass<VerifyEmailSuccessResponse>()(
  'VerificationSuccessResponse',
  {
    data: Schema.Struct({
      access_token: SessionToken
    })
  },
  HttpApiSchema.annotations({ status: StatusCodes.OK })
) {}

const VerifyEmailEndpoint = HttpApiEndpoint.post('verifyEmail', '/auth/verify')
  .setPayload(VerifyEmailRequestBody)
  .addSuccess(VerifyEmailSuccessResponse)
  .addError(InvalidOrExpiredTokenError)
  .addError(UnexpectedError)
  .annotate(OpenApi.Description, 'Verify email')

export default VerifyEmailEndpoint
