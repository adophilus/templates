import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context' // Assuming useDialog is in context.ts or a separate useDialog.ts

export type DialogTriggerProps = ButtonProps & {
  asChild?: boolean;
  disableDefaultBehavior?: boolean; // Add this prop
}

export const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, onClick, disableDefaultBehavior, ...props }, ref) => { // Destructure disableDefaultBehavior
    const { onOpen } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disableDefaultBehavior) { // Only call onOpen if not disabled
        onOpen()
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
        aria-haspopup="dialog"
      />
    )
  }
)
