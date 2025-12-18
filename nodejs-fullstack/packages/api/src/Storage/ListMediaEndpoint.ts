import { HttpApiEndpoint, HttpApiSchema, OpenApi } from '@effect/platform'
import AuthenticationMiddleware from '../Auth/AuthenticationMiddleware'
import { MediaDescription, UnexpectedError } from '../common'
import { Schema } from 'effect'
import { StatusCodes } from 'http-status-codes'

export class ListMediaSuccessResponse extends Schema.TaggedClass<ListMediaSuccessResponse>()(
  'ListMediaSuccessResponse',
  {
    data: Schema.Array(MediaDescription)
  },
  HttpApiSchema.annotations({ status: StatusCodes.OK })
) { }

export const ListMediaEndpoint = HttpApiEndpoint.get(
  'listMedia',
  '/storage/upload'
)
  .addSuccess(ListMediaSuccessResponse)
  .addError(UnexpectedError)
  .middleware(AuthenticationMiddleware)
  .annotate(
    OpenApi.Description,
    'List all media files uploaded by a particular user'
  )
