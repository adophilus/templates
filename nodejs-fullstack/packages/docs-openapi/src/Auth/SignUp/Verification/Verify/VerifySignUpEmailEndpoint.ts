import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import Request from '@api-docs/Auth/SignUp/Verification/Verify/Request'
import Success from '@api-docs/Auth/SignUp/Verification/Verify/Success'
import InvalidOrExpiredTokenError from '@api-docs/Auth/SignUp/Verification/Verify/InvalidOrExpiredTokenError'
import UnexpectedError from '@api-docs/common/UnexpectedError'

const VerifySignUpEmailEndpoint = HttpApiEndpoint.post(
  'verifySignUpEmail',
  '/auth/sign-up/verification'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(InvalidOrExpiredTokenError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Verify email'
  })

export default VerifySignUpEmailEndpoint
