import { HttpApiEndpoint, HttpApiSchema } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import TokenNotExpiredError from '../common/TokenNotExpiredError'
import VerificationEmailAlreadySentError from '../common/VerificationEmailAlreadySentError'
import UserAlreadyVerifiedError from '../common/UserAlreadyVerifiedError'
import UserNotFoundError from '../common/UserNotFoundError'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import { OpenApi } from '@effect/platform'
import Email from '../common/Email'

export class ResendVerificationEmailRequestBody extends Schema.Class<ResendVerificationEmailRequestBody>(
  'ResendVerificationEmailRequestBody'
)(
  {
    email: Email
  },
  {
    description: 'Resend verification email request body'
  }
) { }

export class ResendVerificationEmailSuccessResponse extends Schema.TaggedClass<ResendVerificationEmailSuccessResponse>()(
  'ResendVerificationEmailResponse',
  {},
  HttpApiSchema.annotations({ status: StatusCodes.OK })
) { }

const ResendVerificationEmailEndpoint = HttpApiEndpoint.post(
  'resendVerificationEmail',
  '/auth/verify/resend'
)
  .setPayload(ResendVerificationEmailRequestBody)
  .addSuccess(ResendVerificationEmailSuccessResponse)
  .addError(TokenNotExpiredError)
  .addError(VerificationEmailAlreadySentError)
  .addError(UserAlreadyVerifiedError)
  .addError(UserNotFoundError)
  .addError(BadRequestError)
  .addError(UnexpectedError)
  .annotate(OpenApi.Description, 'Resend verification email')

export default ResendVerificationEmailEndpoint
