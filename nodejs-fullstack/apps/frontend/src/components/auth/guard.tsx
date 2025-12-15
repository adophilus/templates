import type { FunctionComponent, ReactNode } from 'react'

export const Guard: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  return <>{children}</>
}
