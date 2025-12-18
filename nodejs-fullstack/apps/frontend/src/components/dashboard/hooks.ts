import { backendClientAtom } from '@/services/backend'
import { Atom, useAtomValue } from '@effect-atom/atom-react'
import { Effect } from 'effect'

export const galleryAtom = Atom.make(
  Effect.gen(function*() {
    const { client } = yield* Atom.getResult(backendClientAtom)

    return yield* client.Storage.listMedia()
  })
)

export const useGallery = () => useAtomValue(galleryAtom)
