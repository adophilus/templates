import type { FunctionComponent, ReactNode } from 'react'
import { Context, useForm } from './context'
import { useSendSignUpEmail } from './hooks'
import { toast } from 'sonner'
import { useNavigate } from '@tanstack/react-router'
import { Cause, Exit, Schema } from 'effect'
import { signUpSchema, type SignUpSchema } from './schema'

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
    validators: {
      onChange: Schema.standardSchemaV1(signUpSchema)
    },
    onSubmit: async ({ value }) => {
      const val: SignUpSchema = value
      const res = await sendSignUpEmail(val)

      Exit.match(res, {
        onSuccess: () => {
          toast.success('Please check your mailbox')
          navigate({
            to: '/auth/verify',
            search: {
              email: value.email
            }
          })
        },
        onFailure: (cause) => {
          let msg = 'Sorry an error occurred'

          if (Cause.isFailType(cause)) {
            switch (cause.error._tag) {
              case 'EmailAlreadyInUseError': {
                msg = 'Email already in use'
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
