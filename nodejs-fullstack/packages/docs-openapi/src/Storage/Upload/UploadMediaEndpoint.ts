import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import Request from '@api-docs/Storage/Upload/Request'
import Success from '@api-docs/Storage/Upload/Success'
import BadRequestError from '@api-docs/common/BadRequestError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import Authorization from '@api-docs/utils/Middleware/Authorization'

const UploadMediaEndpoint = HttpApiEndpoint.post(
  'uploadMedia',
  '/storage/upload'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Upload multiple media files')
  .middleware(Authorization)

export default UploadMediaEndpoint
