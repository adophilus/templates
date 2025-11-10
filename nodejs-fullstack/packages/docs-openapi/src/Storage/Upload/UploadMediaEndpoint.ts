import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import Request from './Request'
import Success from './Success'
import BadRequestError from '../../common/BadRequestError'
import UnauthorizedError from '../../common/UnauthorizedError'
import UnexpectedError from '../../common/UnexpectedError'

const UploadMediaEndpoint = HttpApiEndpoint.post('uploadMedia', '/storage/upload')
  .addMultipartBody(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Upload multiple media files'
  })
  .addSecurity(OpenApi.BearerAuth())

export default UploadMediaEndpoint
