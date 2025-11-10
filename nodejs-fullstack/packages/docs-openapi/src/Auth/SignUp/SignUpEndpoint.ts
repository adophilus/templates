import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '@api-docs/Auth/SignUp/Request'
import VerificationEmailSent from '@api-docs/Auth/SignUp/VerificationEmailSent'
import EmailAlreadyInUseError from '@api-docs/Auth/SignUp/EmailAlreadyInUseError'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnexpectedError from '@api-docs/common/UnexpectedError'

const SignUpEndpoint = HttpApiEndpoint.post('signUp', '/auth/sign-up')
  .addBody(Request)
  .addSuccess(VerificationEmailSent, { status: StatusCodes.OK })
  .addError(EmailAlreadyInUseError, { status: StatusCodes.CONFLICT })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Sign up new user'
  })

export default SignUpEndpoint
