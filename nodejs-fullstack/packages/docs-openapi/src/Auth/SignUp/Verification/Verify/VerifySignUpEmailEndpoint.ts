import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import InvalidOrExpiredTokenError from './InvalidOrExpiredTokenError'
import UnexpectedError from '../../../../common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '../../../../common/Email'
import Otp from '../../../../common/Otp'
import Jwt from '../../../../common/Jwt'

const Request = Schema.Struct({
  email: Email,
  otp: Otp
}).annotations({
  description: 'Verify email request body'
})

const Success = Schema.Struct({
  code: Schema.Literal('AUTH_CREDENTIALS'),
  data: Schema.Struct({
    access_token: Jwt,
    refresh_token: Jwt
  })
})

const VerifySignUpEmailEndpoint = HttpApiEndpoint.post(
  'verifySignUpEmail',
  '/auth/sign-up/verification'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Verify email')

export default VerifySignUpEmailEndpoint
