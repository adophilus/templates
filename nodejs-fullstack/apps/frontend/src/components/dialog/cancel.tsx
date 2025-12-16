import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context'

export type DialogCancelProps = ButtonProps & {
  asChild?: boolean;
  disableDefaultBehavior?: boolean; // Add this prop
}

export const Cancel = forwardRef<HTMLButtonElement, DialogCancelProps>(
  ({ asChild, onClick, disableDefaultBehavior, ...props }, ref) => { // Destructure disableDefaultBehavior
    const { onClose } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableDefaultBehavior) { // Only call onClose if not disabled
        onClose()
      }
      onClick?.(e) // Always call original onClick if it exists
    }

    const Component = asChild ? Slot : 'button'

    return (
      <Component
        type="button"
        {...props}
        ref={ref}
        onClick={handleClick}
      />
    )
  }
)
