import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import EmailAlreadyInUseError from './EmailAlreadyInUseError'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { OpenApi } from '@effect/platform'
import { Schema } from 'effect'
import Email from '../common/Email'
import FullName from '../common/FullName'

const Request = Schema.Struct({
  full_name: FullName,
  email: Email
}).annotations({
  description: 'Sign up request body'
})

export class SignUpSuccessResponse extends Schema.TaggedClass<SignUpSuccessResponse>()(
  'SignUpResponse',
  {}
) {}

const SignUpEndpoint = HttpApiEndpoint.post('signUp', '/auth/sign-up')
  .setPayload(Request)
  .addSuccess(SignUpSuccessResponse, { status: StatusCodes.OK })
  .addError(EmailAlreadyInUseError, { status: StatusCodes.CONFLICT })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Sign up new user')

export default SignUpEndpoint
