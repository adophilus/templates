import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import Request from '@api-docs/Storage/Upload/Request'
import Success from '@api-docs/Storage/Upload/Success'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnauthorizedError from '@api-docs/common/UnauthorizedError'
import UnexpectedError from '@api-docs/common/UnexpectedError'

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
