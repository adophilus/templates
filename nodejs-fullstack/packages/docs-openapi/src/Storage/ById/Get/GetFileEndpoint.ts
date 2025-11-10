import { HttpApiEndpoint } from '@effect/platform'
import { StatusCodes } from 'http-status-codes'
import { OpenApi } from '@effect/platform'
import Request from './Request'
import ImageFile from '../../../../common/ImageFile'
import NotFoundError from '../../../common/NotFoundError'
import UnauthorizedError from '../../../common/UnauthorizedError'
import UnexpectedError from '../../../common/UnexpectedError'
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
