import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context' // Assuming useDialog is in context.ts or a separate useDialog.ts

export type DialogTriggerProps = ButtonProps & {
  asChild?: boolean;
  disableDefaultBehavior?: boolean; // Re-add this prop
}

export const Trigger = React.forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, onClick, disableDefaultBehavior, ...props }, ref) => {
    const { onOpen } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e); // Always call provided onClick

      // Only call onOpen if disableDefaultBehavior is NOT present AND default was not prevented by onClick
      if (disableDefaultBehavior === undefined && !e.defaultPrevented) {
        onOpen();
      }
    }

    const Component = asChild ? Slot : 'button'

    return (
      <Component
        type="button"
        {...props}
        ref={ref}
        onClick={handleClick}
        aria-haspopup="dialog"
      />
    )
  }
)
