import { BackendClient } from '@/services/backend'
import { rxRuntime } from '@/services/rx'
import { useRxSet } from '@effect-rx/rx-react'
import { Effect } from 'effect'

export const uploadMediaRx = rxRuntime.fn(
  Effect.fn(function* (files: File[]) {
    const { client } = yield* BackendClient

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    return yield* client.Storage.uploadMedia({ payload: formData })
  })
)

export const useUploadMedia = () =>
  useRxSet(uploadMediaRx, { mode: 'promiseExit' })
