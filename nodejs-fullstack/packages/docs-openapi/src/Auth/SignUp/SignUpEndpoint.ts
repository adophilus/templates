import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from './Request'
import VerificationEmailSent from './VerificationEmailSent'
import EmailAlreadyInUseError from './EmailAlreadyInUseError'
import BadRequestError from '../../common/BadRequestError'
import UnexpectedError from '../../common/UnexpectedError'

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
