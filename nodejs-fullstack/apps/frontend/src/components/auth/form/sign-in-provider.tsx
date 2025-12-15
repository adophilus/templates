import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignInEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { Cause, Exit } from 'effect'

export const SignInProvider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const sendSignInEmail = useSendSignInEmail()
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: { email: 'mary.slessor@mail.com' },
    onSubmit: async ({ value }) => {
      const res = await sendSignInEmail(value)

      Exit.match(res, {
        onSuccess: () => {
          toast.success('Please check your mailbox')
          navigate({
            to: '/auth/verify',
            search: { email: value.email }
          })
        },
        onFailure: (cause) => {
          let msg = 'Sorry an error occurred'
          if (Cause.isFailType(cause)) {
            switch (cause.error._tag) {
              case 'UserNotFoundError': {
                msg = "Account not found"
                break
              }
              default: {
                msg = 'Sorry an error occurred'
                break
              }
            }
          }

          toast.error(msg)
        }
      })
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
