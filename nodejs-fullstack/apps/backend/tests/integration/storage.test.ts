import { it, assert, describe, beforeAll } from '@effect/vitest'
import { Effect } from 'effect'
import { type ApiClient, makeApiClient } from '../utils'
import { FetchHttpClient } from '@effect/platform'
import type { AuthSession, AuthUser } from '@/types'
import { createMockUserWithSession } from '../utils/helpers'

describe('Storage API', () => {
  let Client: ApiClient
  let user: AuthUser.Selectable
  let session: AuthSession.Selectable

  beforeAll(async () => {
    const res = await createMockUserWithSession()
    user = res.user
    session = res.session

    Client = makeApiClient(session.id)
  })

  it.effect('should upload a file', () =>
    Effect.gen(function* () {
      const client = yield* Client

      // Create a mock file for testing
      const mockFile = new File(['test file content'], 'test-file.txt', {
        type: 'text/plain'
      })

      const formData = new FormData()
      formData.append('files', mockFile)

      const res = yield* client.Storage.uploadMedia({
        payload: formData
      })

      assert.strictEqual(res._tag, 'UploadMediaResponse')
      assert.property(res, 'code')
      assert.property(res, 'data')
      assert.isArray(res.data)
    }).pipe(
      Effect.tapErrorTag('UnexpectedError', (err) => {
        console.log(err)
        return err
      }),
      Effect.provide(FetchHttpClient.layer)
    )
  )

  it.effect('should get a file by ID', () =>
    Effect.gen(function* () {
      const client = yield* Client

      // This would require a file ID that exists in the system
      // For testing, we'll use a mock ID
      const res = yield* client.Storage.getMedia({
        path: { fileId: 'some-file-id' }
      })

      // The getMedia endpoint returns the file content as binary/Uint8Array
      // We'll verify it returns successfully
      assert.isDefined(res)
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should delete a file by ID', () =>
    Effect.gen(function* () {
      const client = yield* Client

      // This would require a file ID that exists in the system
      // For testing, we'll use a mock ID
      const res = yield* client.Storage.deleteMedia({
        path: { fileId: 'some-file-id' }
      })

      assert.strictEqual(res._tag, 'DeleteMediaResponse')
      // Verify that the response contains the expected structure
      assert.property(res, 'code')
      assert.property(res, 'message')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )
})
