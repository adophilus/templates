import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import InvalidOrExpiredTokenError from '@api-docs/Auth/SignUp/Verification/Verify/InvalidOrExpiredTokenError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '@api-docs/common/Email'
import Otp from '@api-docs/common/Otp'
import Jwt from '@api-docs/common/Jwt'

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

const VerifySignInEmailEndpoint = HttpApiEndpoint.post(
  'verifySignInEmail',
  '/auth/sign-in/verification'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Verify email')

export default VerifySignInEmailEndpoint
