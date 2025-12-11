import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignUpEmail } from './hooks'
import { toast } from 'sonner'

export const VerificationProvider: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const sendSignUpEmail = useSendSignUpEmail()

  const form = useForm({
    onSubmit: async ({ value }) => {
      await sendSignUpEmail(value)
      toast.success('Sign up successful')
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
