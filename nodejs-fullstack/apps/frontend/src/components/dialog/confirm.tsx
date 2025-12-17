import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context'

export type DialogConfirmProps = ButtonProps & {
  asChild?: boolean;
  disableDefaultBehavior?: boolean; // Re-add this prop
}

export const Confirm = forwardRef<HTMLButtonElement, DialogConfirmProps>(
  ({ asChild, onClick, disableDefaultBehavior, ...props }, ref) => {
    const { onClose } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e); // Always call provided onClick

      // Only call onClose if disableDefaultBehavior is NOT present AND default was not prevented by onClick
      if (disableDefaultBehavior === undefined && !e.defaultPrevented) {
        onClose();
      }
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
