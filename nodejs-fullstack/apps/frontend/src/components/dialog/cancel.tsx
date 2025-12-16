import React, { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import type { ButtonProps } from '../button'
import { useDialog } from './context'

export type DialogCancelProps = ButtonProps & {
  asChild?: boolean
}

export const Cancel = forwardRef<HTMLButtonElement, DialogCancelProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { onClose } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClose() // Call onClose from context
      onClick?.(e) // Call original onClick if it exists
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
