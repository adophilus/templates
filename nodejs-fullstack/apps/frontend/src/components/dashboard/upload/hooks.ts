import { makeAtomRuntime } from '@/services/atom'
import { backendClientAtom } from '@/services/backend'
import { Atom, useAtomSet } from '@effect-atom/atom-react'
import { Effect, Layer } from 'effect'

const atomRuntime = makeAtomRuntime(Layer.empty)

export const uploadMediaRx = atomRuntime.fn(
  Effect.fn(function*(files: File[]) {
    const { client } = yield* Atom.getResult(backendClientAtom)

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    return yield* client.Storage.uploadMedia({ payload: formData })
  })
)

export const useUploadMedia = () =>
  useAtomSet(uploadMediaRx, { mode: 'promiseExit' })
