import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useVerifyEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'

export const VerificationProvider: FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  const navigate = useNavigate()
  const verifyEmail = useVerifyEmail()

  const form = useForm({
    onSubmit: async ({ value }) => {
      await verifyEmail(value)
      toast.success('Sign in successful')
      navigate({
        to: '/dashboard'
      })
    }
  })

  return <Context.Provider value={{ form }}>{children}</Context.Provider>
}
