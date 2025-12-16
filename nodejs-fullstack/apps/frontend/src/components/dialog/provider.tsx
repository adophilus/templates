import {
  useRef,
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useEffect
} from 'react'
import { Context } from './context'

export type DialogProviderProps = { children: ReactNode }

export const Provider: FunctionComponent<DialogProviderProps> = ({
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  const onOpen = useCallback(() => {
    dialogRef.current?.showModal()
  }, [])

  const onClose = useCallback(() => {
    dialogRef.current?.close()
  }, [])

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    // Attach event listener for native close event (e.g., escape key)
    dialogElement.addEventListener('close', onClose);

    return () => {
      // Clean up event listener
      dialogElement.removeEventListener('close', onClose);
    };
  }, [onClose]);

  return <Context.Provider value={{ dialogRef, onOpen, onClose }}>{children}</Context.Provider>
}
