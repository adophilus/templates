import { BackendClient } from '@/services/backend'
import { rxRuntime } from '@/services/rx'
import { Effect } from 'effect'

export const uploadFilesRx = rxRuntime.fn(
  Effect.fn(function* (files: File[]) {
    const { client } = yield* BackendClient

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    return yield* client.Storage.uploadMedia({ payload: formData })
  })
)
