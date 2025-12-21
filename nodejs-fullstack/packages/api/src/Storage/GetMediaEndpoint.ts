import { HttpApiEndpoint, HttpApiSchema } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import FileNotFoundError from '../common/FileNotFoundError'
import UnauthorizedError from '../common/UnauthorizedError'
import UnexpectedError from '../common/UnexpectedError'
import { Schema } from 'effect'
import Id from '../common/Id'

export class GetMediaRequestPath extends Schema.Class<GetMediaRequestPath>(
  'GetMediaRequestPath'
)(
  {
    fileId: Id
  },
  {
    description: 'Get file request path parameters'
  }
) {}

export class GetMediaSuccessResponse extends Schema.Uint8ArrayFromSelf.pipe(
  HttpApiSchema.withEncoding({
    kind: 'Uint8Array',
    contentType: 'application/octet-stream'
  })
).pipe(
  Schema.annotations({
    identifier: 'GetMediaSuccessResponse',
    title: 'Get Media Success Response',
    description: 'Success response containing the media file content'
  })
) {}

const GetMediaEndpoint = HttpApiEndpoint.get('getMedia', '/storage/:fileId')
  .setPath(GetMediaRequestPath)
  .addSuccess(GetMediaSuccessResponse, { status: StatusCodes.OK })
  .addError(FileNotFoundError, {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate(OpenApi.Description, 'Get a single media file by ID')

export default GetMediaEndpoint
