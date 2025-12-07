import { forwardRef, type DialogHTMLAttributes } from 'react'
import * as stylex from '@stylexjs/stylex'

export type DialogFooterProps = DialogHTMLAttributes<HTMLDialogElement> & {
  stylexStyles?: stylex.StyleXStyles
}

const styles = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem'
  }
})

export const Footer = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ stylexStyles, ...props }, ref) => (
    <footer {...props} ref={ref} {...stylex.props(styles.container)} />
  )
)
