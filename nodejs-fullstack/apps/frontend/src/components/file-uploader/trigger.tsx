import React, { forwardRef, useContext } from 'react' // Import React
import { Slot } from '@radix-ui/react-slot' // Import Slot
import { Context } from './context'
import type { ButtonProps } from '../button'

export type FileUploaderTriggerProps = ButtonProps & {
  asChild?: boolean;
}

export const Trigger = React.forwardRef<HTMLButtonElement, FileUploaderTriggerProps>(
  ({ asChild, onClick, ...props }, ref) => {
    const { fileInputRef } = useContext(Context)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e); // Always call provided onClick

      if (!e.defaultPrevented) { // Only trigger file input click if default wasn't prevented
        fileInputRef.current?.click();
      }
    }

    const Component = asChild ? Slot : 'button';

    return (
      <Component
        {...props}
        type="button"
        ref={ref}
        onClick={handleClick}
      />
    )
  }
)
