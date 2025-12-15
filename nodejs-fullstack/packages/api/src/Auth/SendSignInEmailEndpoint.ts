import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import UserNotFoundError from '../common/UserNotFoundError'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import { OpenApi } from '@effect/platform'
import Email from '../common/Email'
import { TokenNotExpiredError } from '../common'

export class SendSignInEmailRequestBody extends Schema.Class<SendSignInEmailRequestBody>(
  'SendSignInEmailRequestBody'
)(
  {
    email: Email
  },
  {
    description: 'Send verification email request body'
  }
) { }

export class SendSignInEmailSuccessResponse extends Schema.TaggedClass<SendSignInEmailSuccessResponse>()(
  'SendSignInEmailSuccessResponse',
  {}
) { }

const SendSignInEmailEndpoint = HttpApiEndpoint.post(
  'sendSignInEmail',
  '/auth/sign-in'
)
  .setPayload(SendSignInEmailRequestBody)
  .addSuccess(SendSignInEmailSuccessResponse, { status: StatusCodes.OK })
  .addError(UserNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(TokenNotExpiredError, { status: StatusCodes.BAD_REQUEST })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Send sign in verification email to user')

export default SendSignInEmailEndpoint
