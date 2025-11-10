import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from './Request'
import VerificationEmailSent from '../../SignUp/VerificationEmailSent'
import NotFoundError from '../../../../common/NotFoundError'
import BadRequestError from '../../../../common/BadRequestError'
import UnexpectedError from '../../../../common/UnexpectedError'
import { Schema } from 'effect'

const SendSignInEmailEndpoint = HttpApiEndpoint.post(
  'sendSignInEmail',
  '/auth/sign-in'
)
  .addBody(Request)
  .addSuccess(VerificationEmailSent, { status: StatusCodes.OK })
  .addError(NotFoundError(Schema.Literal('USER')), {
    status: StatusCodes.NOT_FOUND
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Send email to sign in user'
  })

export default SendSignInEmailEndpoint
