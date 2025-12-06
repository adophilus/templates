import type { FunctionComponent, ReactNode } from 'react'
import { FormContext, useForm } from './context'

export const LoginProvier: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const form = useForm()

  return (
    <FormContext.Provider value={{ form }}>{children}</FormContext.Provider>
  )
}
