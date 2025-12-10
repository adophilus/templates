import { useForm as useTanstackForm } from '@tanstack/react-form'
import { createContext } from 'react'

export const useForm = () =>
  useTanstackForm({
    onSubmit: ({ value }) => {
      console.log(value)
    }
  })

export type TForm = ReturnType<typeof useForm>

export type TContext = { form: TForm }

export const Context = createContext<TContext>(null as unknown as TContext)
