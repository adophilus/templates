import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '../../SignUp/Verification/Verify/Request'
import Success from '../../SignUp/Verification/Verify/Success'
import InvalidOrExpiredTokenError from '../../SignUp/Verification/Verify/InvalidOrExpiredTokenError'
import UnexpectedError from '../../../../common/UnexpectedError'

const VerifySignInEmailEndpoint = HttpApiEndpoint.post(
  'verifySignInEmail',
  '/auth/sign-in/verification'
)
  .addBody(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Verify email'
  })

export default VerifySignInEmailEndpoint
