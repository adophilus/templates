import { useForm as useTanstackForm } from '@tanstack/react-form'
import { createContext } from 'react'

export const useForm = () => useTanstackForm()

export type TForm = ReturnType<typeof useForm>

export type TFormContext = { form: TForm }

export const FormContext = createContext<TFormContext>(
  null as unknown as TFormContext
)
