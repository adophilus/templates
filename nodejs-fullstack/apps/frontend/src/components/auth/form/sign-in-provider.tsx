import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignInEmail } from './hooks'

export const SignInProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const [, sendSignInEmail] = useSendSignInEmail()

  const form = useForm({
    onSubmit: ({ value }) => {
      sendSignInEmail(value)
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
