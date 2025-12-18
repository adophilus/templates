import { Atom } from '@effect-atom/atom-react'
import { Logger } from 'effect'

export const makeAtomRuntime = Atom.context({ memoMap: Atom.defaultMemoMap })
makeAtomRuntime.addGlobalLayer(
  Logger.pretty
  // Layer.tapErrorCause(Effect.logError))
)
