import { createContext, type RefObject } from 'react'

export type TContext = {
  dialogRef: RefObject<HTMLDialogElement | null>
}

export const Context = createContext<TContext>(null as unknown as TContext)
