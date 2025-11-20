import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import FileNotFoundError from '../common/FileNotFoundError'
import UnauthorizedError from '../common/UnauthorizedError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import Id from '../common/Id'

const Request = Schema.Struct({
  fileId: Id
}).annotations({
  description: 'Delete file request path parameters'
})

export class DeleteMediaSuccessResponse extends Schema.TaggedClass<DeleteMediaSuccessResponse>()(
  'DeleteMediaResponse',
  {}
) {}

const DeleteMediaEndpoint = HttpApiEndpoint.del('deleteMedia', '/storage/:fileId')
  .setPath(Request)
  .addSuccess(DeleteMediaSuccessResponse, { status: StatusCodes.OK })
  .addError(FileNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Delete a media file by ID')

export default DeleteMediaEndpoint
