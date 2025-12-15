import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useVerifyEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { Cause, Exit } from 'effect'

export const VerificationProvider: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const navigate = useNavigate()
  const verifyEmail = useVerifyEmail()

  const form = useForm({
    onSubmit: async ({ value }) => {
      const res = await verifyEmail(value)

      Exit.match(res, {
        onSuccess: () => {
          toast.success('Sign in successful')
          navigate({
            to: '/dashboard'
          })
        },
        onFailure: (cause) => {
          let msg = 'Sorry an error occurred'

          if (Cause.isFailType(cause)) {
            switch (cause.error._tag) {
              case 'InvalidOrExpiredTokenError': {
                msg = 'Invalid or expired token'
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
