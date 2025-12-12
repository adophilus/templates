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

export class SendVerificationEmailSuccessResponse extends Schema.TaggedClass<SendVerificationEmailSuccessResponse>()(
  'SendVerificationEmailResponse',
  {}
) {}

const _SendVerificationEmailEndpoint = HttpApiEndpoint.post(
  'sendVerificationEmail',
  '/auth/send-otp'
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
  .annotate(OpenApi.Description, 'Send email to sign in user')

export default SendSignInEmailEndpoint
