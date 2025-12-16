import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context'

export type DialogConfirmProps = ButtonProps & {
  asChild?: boolean
}

export const Confirm = forwardRef<HTMLButtonElement, DialogConfirmProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { onClose } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const result = onClick?.(e) // Call original onClick, capture its result
      if (result !== false) { // If onClick doesn't explicitly return false, close the dialog
        onClose() // Call onClose from context
      }
      return result // Return the result of original onClick
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
