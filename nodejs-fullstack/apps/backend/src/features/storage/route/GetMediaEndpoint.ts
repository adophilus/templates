import { Effect, Option } from 'effect'
import { HttpApiBuilder } from '@effect/platform'
import { Api } from '@nodejs-fullstack-template/docs-openapi'
import FileNotFoundError from '@nodejs-fullstack-template/docs-openapi/common/FileNotFoundError'
import UnexpectedError from '@nodejs-fullstack-template/docs-openapi/common/UnexpectedError'
import { Storage } from '../service'

export const GetMediaEndpointLive = HttpApiBuilder.handler(
  Api,
  'Storage',
  'getMedia',
  ({ path }) =>
    Effect.gen(function* () {
      const storage = yield* Storage

      const result = Option.getOrNull(
        yield* storage
          .get(path.fileId)
          .pipe(Effect.mapError(() => new UnexpectedError()))
      )

      if (result === null) {
        return yield* new FileNotFoundError()
      }

      return result.file_data
    })
)
