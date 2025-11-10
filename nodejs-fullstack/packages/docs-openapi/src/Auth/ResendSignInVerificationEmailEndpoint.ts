import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import TokenNotExpiredError from '../common/TokenNotExpiredError'
import VerificationEmailAlreadySentError from '../common/VerificationEmailAlreadySentError'
import UserAlreadyVerifiedError from '../common/UserAlreadyVerifiedError'
import UserNotFoundError from '../common/UserNotFoundError'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import { OpenApi } from '@effect/platform'
import Email from '../common/Email'

const Request = Schema.Struct({
  email: Email
}).annotations({
  description: 'Send verification email request body'
})

const Success = Schema.Struct({
  code: Schema.Literal('VERIFICATION_EMAIL_SENT')
})

const ResendSignInVerificationEmailEndpoint = HttpApiEndpoint.post(
  'resendSignInVerificationEmail',
  '/auth/sign-in/verification/resend'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(TokenNotExpiredError, { status: StatusCodes.BAD_REQUEST })
  .addError(VerificationEmailAlreadySentError, {
    status: StatusCodes.BAD_REQUEST
  })
  .addError(UserAlreadyVerifiedError, { status: StatusCodes.BAD_REQUEST })
  .addError(UserNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Resend verification email')

export default ResendSignInVerificationEmailEndpoint
