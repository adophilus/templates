import { HttpApiEndpoint, HttpApiSchema } from '@effect/platform'
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
  description: 'Get file request path parameters'
})

const GetMediaEndpoint = HttpApiEndpoint.get('getMedia', '/storage/:fileId')
  .setPath(Request)
  .addSuccess(
    Schema.Uint8ArrayFromSelf.pipe(
      HttpApiSchema.withEncoding({
        kind: 'Uint8Array',
        contentType: 'application/octet-stream'
      })
    ),
    { status: StatusCodes.OK }
  )
  .addError(FileNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Get a single media file by ID')

export default GetMediaEndpoint
