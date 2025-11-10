import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '@api-docs/Auth/Verification/SendVerificationEmail/Request'
import Success from '@api-docs/Auth/Verification/SendVerificationEmail/Success'
import TokenNotExpiredError from '@api-docs/Auth/Verification/SendVerificationEmail/TokenNotExpiredError'
import VerificationEmailAlreadySentError from '@api-docs/Auth/Verification/SendVerificationEmail/VerificationEmailAlreadySentError'
import UserAlreadyVerifiedError from '@api-docs/Auth/Verification/SendVerificationEmail/UserAlreadyVerifiedError'
import NotFoundError from '@api-docs/common/NotFoundError'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import { Schema } from 'effect'

const ResendSignUpVerificationEmailEndpoint = HttpApiEndpoint.post(
  'resendSignUpVerificationEmail',
  '/auth/sign-up/verification/resend'
)
  .addBody(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(TokenNotExpiredError, { status: StatusCodes.BAD_REQUEST })
  .addError(VerificationEmailAlreadySentError, {
    status: StatusCodes.BAD_REQUEST
  })
  .addError(UserAlreadyVerifiedError, { status: StatusCodes.BAD_REQUEST })
  .addError(NotFoundError(Schema.Literal('USER')), {
    status: StatusCodes.NOT_FOUND
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Resend verification email'
  })

export default ResendSignUpVerificationEmailEndpoint
