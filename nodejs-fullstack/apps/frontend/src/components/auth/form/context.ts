import {
  useForm as useTanstackForm,
  type AnyFormOptions
} from '@tanstack/react-form'
import { createContext } from 'react'

export const useForm = (opts: AnyFormOptions) => useTanstackForm(opts)

export type TForm = ReturnType<typeof useForm>

export type TContext = { form: TForm }

export const Context = createContext<TContext>(null as unknown as TContext)
