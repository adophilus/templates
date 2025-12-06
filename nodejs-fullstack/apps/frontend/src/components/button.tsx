import { forwardRef } from 'react'
import * as stylex from '@stylexjs/stylex'
import { color } from '@/styles/design/tokens.stylex'

const styles = stylex.create({
  button: {
    backgroundColor: color.primary,
    color: color.secondary,
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem'
  }
})

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    stylexStyles?: stylex.StyleXStyles
  }
>(({ stylexStyles, ...props }, ref) => (
  <button {...props} {...stylex.props(styles.button, stylexStyles)} ref={ref} />
))
