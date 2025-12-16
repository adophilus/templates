import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context' // Assuming useDialog is in context.ts or a separate useDialog.ts

export type DialogTriggerProps = ButtonProps & {
  asChild?: boolean
}

export const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { onOpen } = useDialog() // Use onOpen from the dialog context

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onOpen() // Call onOpen from context
      onClick?.(e) // Call original onClick if it exists
    }

    const Component = asChild ? Slot : 'button'

    return (
      <Component
        type="button"
        {...props}
        ref={ref}
        onClick={handleClick}
        // Add accessibility attributes for dialog triggers
        aria-haspopup="dialog"
      />
    )
  }
)
