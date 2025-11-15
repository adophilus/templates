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

const Success = Schema.Struct({
  code: Schema.Literal('FILE_DELETED'),
  message: Schema.String
})

const DeleteFileEndpoint = HttpApiEndpoint.del('deleteFile', '/storage/:fileId')
  .setPath(Request)
  .addSuccess(Success, { status: StatusCodes.OK })
  .addError(FileNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Delete a media file by ID')

export default DeleteFileEndpoint
