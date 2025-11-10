import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import UserNotFoundError from '@api-docs/common/UserNotFoundError'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import { Schema } from 'effect'
import { OpenApi } from '@effect/platform'
import Email from '@api-docs/common/Email'

const Request = Schema.Struct({
  email: Email
}).annotations({
  description: 'Send sign in email request body'
})

const Success = Schema.Struct({
  code: Schema.Literal('VERIFICATION_EMAIL_SENT')
})

const SendSignInEmailEndpoint = HttpApiEndpoint.post(
  'sendSignInEmail',
  '/auth/sign-in'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(UserNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Send email to sign in user')

export default SendSignInEmailEndpoint
