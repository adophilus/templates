import { it, assert, describe, beforeAll } from '@effect/vitest'
import { Effect } from 'effect'
import { type ApiClient, makeApiClient } from '../utils'
import { FetchHttpClient } from '@effect/platform'
import type { AuthSession, AuthUser } from '@/types'
import MediaDescription from '@nodejs-fullstack-template/api/common/MediaDescription'
import { createMockUserWithSession } from '../utils/helpers'
import { readFile } from 'node:fs/promises'

describe('Storage API', () => {
  let Client: ApiClient
  let user: AuthUser.Selectable
  let session: AuthSession.Selectable
  let file: File
  let uploadedFile: MediaDescription

  beforeAll(async () => {
    const res = await createMockUserWithSession()
    user = res.user
    session = res.session

    const fileData = await readFile('tests/assets/cube.png')
    const fileBlob = new Blob([Buffer.from(fileData)])
    file = new File([fileBlob], 'cube.png', { type: 'image/png' })

    Client = makeApiClient(session.id)
  })

  it.effect('should upload a file', () =>
    Effect.gen(function* () {
      const client = yield* Client

      const formData = new FormData()
      formData.append('files', file)

      const res = yield* client.Storage.uploadMedia({
        payload: formData
      })

      assert.strictEqual(res._tag, 'UploadMediaResponse')
      assert.isArray(res.data)
      assert.strictEqual(res.data.length, 1)

      uploadedFile = res.data[0]
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should get a file by ID', () =>
    Effect.gen(function* () {
      const client = yield* Client

      const res = yield* client.Storage.getMedia({
        path: { fileId: uploadedFile.id }
      })

      assert.isDefined(res)
      assert.instanceOf(res, Uint8Array)
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )

  it.effect('should delete a file by ID', () =>
    Effect.gen(function* () {
      const client = yield* Client

      const res = yield* client.Storage.deleteMedia({
        path: { fileId: uploadedFile.id }
      })

      assert.strictEqual(res._tag, 'DeleteMediaResponse')
    }).pipe(Effect.provide(FetchHttpClient.layer))
  )
})
