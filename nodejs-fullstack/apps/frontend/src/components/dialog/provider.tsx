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
  children: ReactNode;
  open?: boolean; // Re-introduced open prop
}

export const Provider: FunctionComponent<DialogProviderProps> = ({
  children,
  open: controlledOpen // Rename to avoid conflict with internal state
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false); // Internal state for uncontrolled mode

  // Determine if the dialog is controlled or uncontrolled
  const isControlled = typeof controlledOpen === 'boolean';
  // const isOpen = isControlled ? controlledOpen : uncontrolledOpen; // Not strictly needed here, but conceptually

  const onOpen = useCallback(() => {
    if (isControlled) {
      // In controlled mode, we don't manage the state, parent does
      // We rely on the parent updating `controlledOpen` prop
      // However, we still need to show the modal if the controlledOpen is true
      if (controlledOpen === false) { // Only force showModal if controlledOpen is currently false
        dialogRef.current?.showModal();
      }
      return;
    }
    setUncontrolledOpen(true);
    dialogRef.current?.showModal();
  }, [isControlled, controlledOpen]); // Add controlledOpen to dependency array

  const onClose = useCallback(() => {
    console.log(isControlled)
    if (isControlled) {
      // In controlled mode, we don't manage the state, parent does
      // We rely on the parent updating `controlledOpen` prop
      // However, we still need to close the modal if the controlledOpen is true
      if (controlledOpen === true) { // Only force close if controlledOpen is currently true
        dialogRef.current?.close();
      }
      return;
    }
    setUncontrolledOpen(false);
    dialogRef.current?.close();
  }, [isControlled, controlledOpen]); // Add controlledOpen to dependency array

  // Effect to handle controlled 'open' prop changes
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isControlled) {
      if (controlledOpen) {
        dialogElement.showModal();
      } else {
        dialogElement.close();
      }
    }
  }, [isControlled, controlledOpen]);


  // Effect to handle native close event (e.g., escape key)
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    const handleNativeClose = () => {
      if (!isControlled) {
        // Only update internal state if in uncontrolled mode
        setUncontrolledOpen(false);
      }
      // If controlled, parent is responsible for reacting to native close and updating controlledOpen
    };

    dialogElement.addEventListener('close', handleNativeClose);

    return () => {
      dialogElement.removeEventListener('close', handleNativeClose);
    };
  }, [isControlled]);


  return (
    <Context.Provider value={{ dialogRef, onOpen, onClose }}>
      {children}
    </Context.Provider>
  )
}
