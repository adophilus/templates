import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '../../../Verification/SendVerificationEmail/Request'
import Success from '../../../Verification/SendVerificationEmail/Success'
import TokenNotExpiredError from '../../../Verification/SendVerificationEmail/TokenNotExpiredError'
import VerificationEmailAlreadySentError from '../../../Verification/SendVerificationEmail/VerificationEmailAlreadySentError'
import UserAlreadyVerifiedError from '../../../Verification/SendVerificationEmail/UserAlreadyVerifiedError'
import NotFoundError from '../../../../common/NotFoundError'
import BadRequestError from '../../../../common/BadRequestError'
import UnexpectedError from '../../../../common/UnexpectedError'
import { Schema } from 'effect'

const ResendSignInVerificationEmailEndpoint = HttpApiEndpoint.post(
  'resendSignInVerificationEmail',
  '/auth/sign-in/verification/resend'
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

export default ResendSignInVerificationEmailEndpoint
