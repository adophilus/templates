import { useEffect } from 'react'
import { runtime } from './runtime'
import { Effect } from 'effect'

export const InitRuntime = () => {
  useEffect(() => {
    return runtime.runCallback(Effect.void)
  }, [])

  return null
}
