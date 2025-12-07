import { useRef, type FunctionComponent, type ReactNode } from 'react'
import { Context } from './context'

export const Provider: FunctionComponent<{ children: ReactNode }> = ({
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  return <Context.Provider value={{ dialogRef }}>{children}</Context.Provider>
}
