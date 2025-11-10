import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import Request from '@api-docs/Storage/ById/Get/Request'
import ImageFile from '@api-docs/common/ImageFile'
import NotFoundError from '@api-docs/common/NotFoundError'
import UnauthorizedError from '@api-docs/common/UnauthorizedError'
import UnexpectedError from '@api-docs/common/UnexpectedError'
import { Schema } from 'effect'

const GetFileEndpoint = HttpApiEndpoint.get('getFile', '/storage/:fileId')
  .addPath(Request)
  .addSuccess(ImageFile, { status: StatusCodes.OK })
  .addError(NotFoundError(Schema.Literal('FILE')), {
    status: StatusCodes.NOT_FOUND
  })
  .addError(UnauthorizedError, { status: StatusCodes.UNAUTHORIZED })
  .addError(UnexpectedError, { status: StatusCodes.INTERNAL_SERVER_ERROR })
  .annotate({
    description: 'Get a single media file by ID'
  })

export default GetFileEndpoint
