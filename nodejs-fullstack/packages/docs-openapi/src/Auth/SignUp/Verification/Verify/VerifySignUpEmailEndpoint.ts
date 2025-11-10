import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from './Request'
import Success from './Success'
import InvalidOrExpiredTokenError from './InvalidOrExpiredTokenError'
import UnexpectedError from '../../../../common/UnexpectedError'

const VerifySignUpEmailEndpoint = HttpApiEndpoint.post(
  'verifySignUpEmail',
  '/auth/sign-up/verification'
)
  .addBody(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Verify email'
  })

export default VerifySignUpEmailEndpoint
