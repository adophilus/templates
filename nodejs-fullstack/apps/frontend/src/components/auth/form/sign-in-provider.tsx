import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignInEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const SignInProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const sendSignInEmail = useSendSignInEmail()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { email: 'mary.slessor@mail.com' },
    onSubmit: async ({ value }) => {
      await sendSignInEmail(value)

      toast.success('Please check your mailbox')

      navigate({
        to: '/auth/verify',
        search: { email: value.email }
      })
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
