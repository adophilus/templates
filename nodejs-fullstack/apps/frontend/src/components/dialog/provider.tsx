import {
  useRef,
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useEffect,
  useState
} from 'react'
import { Context } from './context'

export type DialogProviderProps = {
  children: ReactNode
  open?: boolean // Re-introduced open prop
}

export const Provider: FunctionComponent<DialogProviderProps> = ({
  children,
  open
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const onOpen = () => {
    if (open === undefined) {
      dialogRef.current?.showModal()
    }
  }

  const onClose = () => {
    if (open === undefined) {
      dialogRef.current?.close()
    }
  }

  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement) return

    if (open === undefined) return

    if (open) {
      dialogElement.showModal()
    } else {
      dialogElement.close()
    }
  }, [open])

  // Effect to handle native close event (e.g., escape key)
  useEffect(() => {
    const dialogElement = dialogRef.current
    if (!dialogElement) return

    const handleNativeClose = (e: Event) => {
      if (open !== undefined && !open) return

      e.preventDefault()
    }

    dialogElement.addEventListener('cancel', handleNativeClose)

    return () => {
      dialogElement.removeEventListener('cancel', handleNativeClose)
    }
  }, [open])

  return (
    <Context.Provider value={{ dialogRef, onOpen, onClose }}>
      {children}
    </Context.Provider>
  )
}
