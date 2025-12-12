import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import UserNotFoundError from '../common/UserNotFoundError'
import UserNotVerifiedError from '../common/UserNotVerifiedError'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import { OpenApi } from '@effect/platform'
import Email from '../common/Email'

const Request = Schema.Struct({
  email: Email
}).annotations({
  description: 'Send sign in email request body'
})

export class SendSignInEmailSuccessResponse extends Schema.TaggedClass<SendSignInEmailSuccessResponse>()(
  'SendSignInEmailSuccessResponse',
  {}
) {}

const SendSignInEmailEndpoint = HttpApiEndpoint.post(
  'sendSignInEmail',
  '/auth/sign-in'
)
  .setPayload(Request)
  .addSuccess(SendSignInEmailSuccessResponse, { status: StatusCodes.OK })
  .addError(UserNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UserNotVerifiedError, {
    status: StatusCodes.FORBIDDEN
  })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Send sign in email to user')

export default SendSignInEmailEndpoint
