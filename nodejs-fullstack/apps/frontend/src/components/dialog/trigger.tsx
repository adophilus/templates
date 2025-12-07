import { forwardRef, useContext } from 'react'
import type { ButtonProps } from '../button'
import { Context } from './context'
import { assert } from 'assertate'

export type DialogTriggerProps = ButtonProps

export const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  ({ stylexStyles, onClick, ...props }, ref) => {
    const { dialogRef } = useContext(Context)

    return (
      <button
        {...props}
        ref={ref}
        onClick={(e) => {
          const dialogEl = dialogRef.current
          assert(dialogEl, 'no dialog ref')

          dialogEl.showModal()
          onClick?.(e)
        }}
      />
    )
  }
)
