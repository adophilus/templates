import { forwardRef, type DialogHTMLAttributes } from 'react'
import * as stylex from '@stylexjs/stylex'

export type DialogShellProps = DialogHTMLAttributes<HTMLDialogElement> & {
  stylexStyles?: stylex.StyleXStyles
}

export const Shell = forwardRef<HTMLDialogElement, DialogShellProps>(
  ({ stylexStyles, ...props }, ref) => (
    <dialog {...props} ref={ref}>
      <header>Are you sure?</header>
      <p>lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
      <footer>
        <button type="button">cancel</button>
        <button type="button">confirm</button>
      </footer>
    </dialog>
  )
)
