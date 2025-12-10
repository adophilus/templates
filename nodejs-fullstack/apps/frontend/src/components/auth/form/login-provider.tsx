import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'

export const LoginProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const form = useForm()

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
