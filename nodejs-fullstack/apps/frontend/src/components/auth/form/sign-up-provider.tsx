import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignUpEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const SignUpProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const sendSignUpEmail = useSendSignUpEmail()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      full_name: 'Mary Slessor',
      email: 'mary.slessor@mail.com'
    },
    onSubmit: async ({ value }) => {
      await sendSignUpEmail(value)

      toast.success('Please check your mailbox')

      navigate({
        to: '/auth/verify',
        search: {
          email: value.email
        }
      })
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
