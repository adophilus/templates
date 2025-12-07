import { forwardRef, useContext } from 'react'
import type { ButtonProps } from '../button'
import { Context } from './context'

export type DialogConfirmProps = ButtonProps

export const Confirm = forwardRef<HTMLButtonElement, DialogConfirmProps>(
  ({ stylexStyles, onClick, ...props }, ref) => {
    const { dialogRef } = useContext(Context)

    return (
      <button
        type="button"
        {...props}
        ref={ref}
        onClick={(e) => {
          dialogRef.current?.close()
          onClick?.(e)
        }}
      />
    )
  }
)
