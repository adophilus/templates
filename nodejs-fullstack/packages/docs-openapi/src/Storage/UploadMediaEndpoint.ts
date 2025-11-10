import { HttpApiEndpoint, HttpApiSchema } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import BadRequestError from '../common/BadRequestError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import ImageFiles from '../common/ImageFiles'
import MediaDescription from '../common/MediaDescription'

const Request = HttpApiSchema.Multipart(
  Schema.Struct({
    files: ImageFiles
  })
).annotations({
  description: 'Upload media request body'
})

const Success = Schema.Struct({
  code: Schema.Literal('MEDIA_UPLOADED'),
  data: Schema.Array(MediaDescription)
})

const UploadMediaEndpoint = HttpApiEndpoint.post(
  'uploadMedia',
  '/storage/upload'
)
  .setPayload(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(BadRequestError, { status: StatusCodes.BAD_REQUEST })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Upload multiple media files')

export default UploadMediaEndpoint
