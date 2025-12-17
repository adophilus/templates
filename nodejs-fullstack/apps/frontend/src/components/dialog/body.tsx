import { forwardRef, type DialogHTMLAttributes } from 'react'
import * as stylex from '@stylexjs/stylex'

export type DialogBodyProps = DialogHTMLAttributes<HTMLDivElement> & {
  stylexStyles?: stylex.StyleXStyles
}

export const Body = forwardRef<HTMLDivElement, DialogBodyProps>(
  ({ stylexStyles, ...props }, ref) => (
    <div {...props} {...stylex.props(stylexStyles)} ref={ref} />
  )
)
