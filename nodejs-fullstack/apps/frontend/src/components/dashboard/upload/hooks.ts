import { backendClientAtom } from '@/services/backend'
import {
  Atom,
  Registry,
  useAtomSet,
  useAtomValue
} from '@effect-atom/atom-react'
import { Effect } from 'effect'

export const uploadMediaRx = Atom.fn(
  Effect.fn(function* (files: File[]) {
    const { client } = yield* Atom.getResult(backendClientAtom)
    const registry = yield* Registry.AtomRegistry

    const formData = new FormData()
    for (const file of files) {
      formData.append('files', file)
    }

    const res = yield* client.Storage.uploadMedia({ payload: formData })
    registry.refresh(listMediaAtom)

    return res
  })
)

export const listMediaAtom = Atom.make(
  Effect.gen(function* () {
    const { client } = yield* Atom.getResult(backendClientAtom)

    return yield* client.Storage.listMedia()
  })
)

const deleteMediaAtom = Atom.fn(
  Effect.fn(function* (fileId: string) {
    const { client } = yield* Atom.getResult(backendClientAtom)
    const registry = yield* Registry.AtomRegistry

    const res = yield* client.Storage.deleteMedia({
      path: {
        fileId
      }
    })

    registry.refresh(listMediaAtom)

    return res
  })
)

export const useUploadMedia = () =>
  useAtomSet(uploadMediaRx, { mode: 'promiseExit' })

export const useListMedia = () => useAtomValue(listMediaAtom)
export const useDeleteMedia = () =>
  useAtomSet(deleteMediaAtom, { mode: 'promiseExit' })
