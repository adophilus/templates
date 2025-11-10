import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '@api-docs/Auth/SignIn/SignIn/Request'
import VerificationEmailSent from '@api-docs/Auth/SignUp/VerificationEmailSent'
import UserNotFoundError from '@api-docs/common/UserNotFoundError'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import { Schema } from 'effect'

const SendSignInEmailEndpoint = HttpApiEndpoint.post(
  'sendSignInEmail',
  '/auth/sign-in'
)
  .setPayload(Request)
  .addSuccess(VerificationEmailSent, { status: StatusCodes.OK })
  .addError(UserNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Send email to sign in user'
  })

export default SendSignInEmailEndpoint
