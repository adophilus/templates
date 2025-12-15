import { forwardRef, useContext } from 'react'
import { Context } from './context'
import type { ButtonProps } from '../button'

export const Trigger = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, ...props }, ref) => {
    const { fileInputRef } = useContext(Context)

    return (
      <button
        {...props}
        ref={ref}
        onClick={(e) => {
          if (onClick) onClick(e)
          else fileInputRef.current?.click()
        }}
      />
    )
  }
)
