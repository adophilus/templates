import { useAtomMount } from '@effect-atom/atom-react'
import { makeAtomRuntime } from './runtime'
import { Layer } from 'effect'
// import { BackendClientLive } from '../backend'

// const atomRuntime = makeAtomRuntime(BackendClientLive)
const atomRuntime = makeAtomRuntime(Layer.empty)

export const InitRuntime = () => {
  useAtomMount(atomRuntime)

  return null
}
