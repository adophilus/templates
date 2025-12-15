import {
  useEffect,
  useRef,
  type FunctionComponent,
  type ReactNode
} from 'react'
import { Context } from './context'

export type DialogProviderProps = { children: ReactNode; open?: boolean }

export const Provider: FunctionComponent<DialogProviderProps> = ({
  children,
  open
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    }
  }, [open])

  return <Context.Provider value={{ dialogRef }}>{children}</Context.Provider>
}
