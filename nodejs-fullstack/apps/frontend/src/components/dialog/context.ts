import { createContext, type RefObject, useContext } from 'react'

export type TContext = {
  dialogRef: RefObject<HTMLDialogElement | null>
  onOpen: () => void
  onClose: () => void
}

export const Context = createContext<TContext>(null as unknown as TContext)

export const useDialog = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
